const rolForm = document.getElementById("rolForm");
const rolIdField = document.getElementById("rolId");
const nameField = document.getElementById("name");
const typeRolField = document.getElementById("typeRol");
const activeField = document.getElementById("active");

// Función para enviar los datos del formulario
async function submitForm(event) {
    event.preventDefault();

    const rolDTO = {
        id: rolIdField.value,
        name: nameField.value,
        typeRol: typeRolField.value,
        active: activeField.value === "true"
    };

    // Determinar si estamos creando o actualizando el rol
    const apiUrl = rolDTO.id ? `https://localhost:7199/api/Rol/${rolDTO.id}` : 'https://localhost:7199/api/Rol'; // Si el ID está presente, es una actualización
    const method = rolDTO.id ? 'PUT' : 'POST';

    try {
        // Hacer la petición a la API
        const response = await axios({
            method: method,
            url: apiUrl,
            data: rolDTO
        });

        // Mostrar mensaje de éxito o manejar respuesta
        alert("Rol guardado exitosamente");
        console.log(response.data); // Mostrar el objeto del rol guardado

        // Limpiar formulario
        rolForm.reset();
        rolIdField.value = ""; // Limpiar el ID en caso de actualizar
    } catch (error) {
        console.error("Hubo un error:", error);
        alert("Ocurrió un error al guardar el rol.");
    }
}

// Asignar evento al formulario
rolForm.addEventListener("submit", submitForm);

// Función para cargar datos en caso de edición
async function loadRolData(rolId) {
    try {
        // Realizar la petición GET para obtener los datos del rol
        const response = await axios.get(`https://localhost:7199/api/Rol/${rolId}`);
        const rol = response.data;

        // Cargar los datos del rol en los campos del formulario
        rolIdField.value = rol.id;
        nameField.value = rol.name;
        typeRolField.value = rol.typeRol;
        activeField.value = rol.active.toString();
    } catch (error) {
        console.error("Error al cargar el rol:", error);
        alert("No se pudo cargar los datos del rol.");
    }
}

// Ejemplo: Cargar un rol para actualizar (esto sería dinámico en la aplicación)
loadRolData(1); // Llamada de ejemplo para cargar el rol con ID 1