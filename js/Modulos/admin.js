// URL de la API (modificarla según la URL real de tu API)
const apiUrl = 'https://localhost:7199/api/Person'; // Aquí puedes poner la URL de tu API

// Función para obtener los registros
function fetchPersons() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Imprime la respuesta en la consola para verificar
            displayPersons(data); // Llama a la función para mostrar los datos en la tabla
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
        });
}

// Función para mostrar las personas en la tabla
function displayPersons(persons) {
    const tableBody = document.getElementById('personTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos registros

    persons.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.surname}</td>
            <td>${person.document}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
            <td>${person.codeDane}</td>
            <td>${person.password}</td>
            <td>${person.active ? 'Sí' : 'No'}</td>
            <td>
                <button class="btn btn-warning" onclick="editPerson(${person.id})">Editar</button>
                <button class="btn btn-danger" onclick="deletePerson(${person.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para editar una persona (solo el ejemplo, puedes agregar funcionalidad más tarde)
function editPerson(id) {
    alert('Editar persona con ID: ' + id);
    // Implementar lógica para editar una persona
}

// Función para eliminar una persona
function deletePerson(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Persona eliminada con éxito');
                fetchPersons(); // Recargar los registros después de eliminar
            } else {
                alert('Error al eliminar la persona');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la persona:', error);
        });
    }
}

// Cargar las personas al cargar la página
window.onload = fetchPersons;





