// URL base de la API
const API_URL = 'https://localhost:7199/api/Rol'; // Cambia a la URL de tu API
let currentRoleId = null;  // Para guardar el ID del rol actualmente seleccionado
let roles = [];  // Lista de roles

// Función para mostrar mensajes
function showToast(message, type) {
    // Aquí puedes implementar un sistema de notificaciones para mostrar mensajes
    alert(`${type}: ${message}`);
}

// Función para mostrar el estado de carga
function showLoading(isLoading) {
    // Aquí puedes mostrar un indicador de carga
    console.log(isLoading ? "Cargando..." : "Listo");
}

// Función para obtener todos los roles desde la API
async function fetchRoles() {
    showLoading(true);
    try {
        const res = await fetch(`${API_URL}/roles`);
        if (!res.ok) throw new Error('Error al obtener los roles');
        roles = await res.json();
        renderRolesTable();
    } catch (err) {
        showToast(err.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Función para mostrar los roles en la tabla
function renderRolesTable() {
    const rolesTableBody = document.getElementById('rolesTableBody');
    rolesTableBody.innerHTML = '';
    roles.forEach(role => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${role.id}</td>
            <td>${role.name}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editRole(${role.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteRoleConfirmation(${role.id})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        rolesTableBody.appendChild(tr);
    });
}

// Función para editar un rol (Abre el modal con los datos del rol)
function editRole(id) {
    currentRoleId = id;
    const role = roles.find(r => r.id === id);
    document.getElementById('roleName').value = role.name;
    document.getElementById('modalTitle').textContent = 'Actualizar Rol';
    $('#roleModal').modal('show');  // Usando Bootstrap para mostrar el modal
}

// Función para eliminar un rol (Llamada a confirmación de eliminación)
function deleteRoleConfirmation(id) {
    currentRoleId = id;
    $('#deleteModal').modal('show');  // Usando Bootstrap para mostrar el modal de confirmación
}

// Función para actualizar completamente un rol (PUT)
async function updateRole(data) {
    showLoading(true);
    try {
        const res = await fetch(`${API_URL}/roles/${currentRoleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Error al actualizar el rol');
        await fetchRoles();  // Recargar la lista de roles
        showToast('Rol actualizado exitosamente', 'success');
    } catch (err) {
        showToast(err.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Función para actualizar parcialmente un rol (PATCH)
async function updatePartialRole(data) {
    showLoading(true);
    try {
        const res = await fetch(`${API_URL}/roles/${currentRoleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Error al actualizar parcialmente el rol');
        await fetchRoles();  // Recargar la lista de roles
        showToast('Rol actualizado parcialmente', 'success');
    } catch (err) {
        showToast(err.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Función para eliminar un rol lógicamente (DELETE)
async function deleteRole(id) {
    showLoading(true);
    try {
        const res = await fetch(`${API_URL}/roles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: false }),  // Marcar el rol como inactivo
        });

        if (!res.ok) throw new Error('Error al eliminar el rol');
        await fetchRoles();  // Recargar la lista de roles
        showToast('Rol eliminado exitosamente', 'success');
    } catch (err) {
        showToast(err.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Función para enviar los datos del formulario para actualizar el rol
async function submitRoleForm() {
    const roleName = document.getElementById('roleName').value;

    if (!roleName) {
        showToast('El nombre del rol es obligatorio', 'danger');
        return;
    }

    const roleData = { name: roleName };

    if (currentRoleId) {
        await updateRole(roleData);  // Actualizar el rol completo
    } else {
        await updatePartialRole(roleData);  // Actualización parcial (si necesario)
    }
}

// Inicialización: Cargar roles al inicio
fetchRoles();
