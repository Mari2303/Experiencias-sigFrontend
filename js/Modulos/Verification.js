const apiUrl = 'https://localhost:7199/api/Verification'; // Cambia la URL según tu entorno

// Función para obtener todas las verificaciones
async function getAllVerifications() {
    try {
        const response = await fetch(apiUrl);
        const verifications = await response.json();
        const list = document.getElementById('verificationList');
        list.innerHTML = '';
        verifications.forEach(verification => {
            const li = document.createElement('li');
            li.textContent = `${verification.id} - ${verification.name} - ${verification.description}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener las verificaciones:', error);
    }
}

// Función para obtener una verificación por su ID
async function getVerificationById() {
    const id = document.getElementById('getById').value;
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const verification = await response.json();
        if (verification.id) {
            document.getElementById('verificationDetails').textContent = 
                `ID: ${verification.id}, Nombre: ${verification.name}, Descripción: ${verification.description}`;
        } else {
            document.getElementById('verificationDetails').textContent = 'Verificación no encontrada.';
        }
    } catch (error) {
        console.error('Error al obtener la verificación por ID:', error);
    }
}

// Función para crear una nueva verificación
async function createVerification() {
    const name = document.getElementById('createName').value;
    const description = document.getElementById('createDescription').value;
    const data = { name, description };
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert('Verificación creada: ' + result.id);
        getAllVerifications(); // Actualizar la lista de verificaciones
    } catch (error) {
        console.error('Error al crear la verificación:', error);
    }
}

// Función para actualizar una verificación
async function updateVerification() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const description = document.getElementById('updateDescription').value;
    const data = { name, description };
    
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Verificación actualizada');
            getAllVerifications(); // Actualizar la lista de verificaciones
        } else {
            alert('Error al actualizar la verificación');
        }
    } catch (error) {
        console.error('Error al actualizar la verificación:', error);
    }
}

// Función para eliminar una verificación
async function deleteVerification() {
    const id = document.getElementById('deleteId').value;
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Verificación eliminada');
            getAllVerifications(); // Actualizar la lista de verificaciones
        } else {
            alert('Error al eliminar la verificación');
        }
    } catch (error) {
        console.error('Error al eliminar la verificación:', error);
    }
}

// Cargar las verificaciones al cargar la página
window.onload = getAllVerifications;