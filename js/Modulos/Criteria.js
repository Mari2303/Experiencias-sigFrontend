const API_URL = 'https://localhost:7199/api/Criteria';
    const tableBody = document.getElementById('criteriaTableBody');
    const modal = new bootstrap.Modal(document.getElementById('criteriaModal'));
    const form = document.getElementById('criteriaForm');
    const btnAddCriteria = document.getElementById('btnAddCriteria');
    const btnPatchCriteria = document.getElementById('btnPatchCriteria');
    const criteriaId = document.getElementById('criteriaId');
    const criteriaName = document.getElementById('criteriaName');

    let currentId = null;

    document.addEventListener('DOMContentLoaded', loadData);

    btnAddCriteria.addEventListener('click', () => {
        form.reset();
        currentId = null;
        modal.show();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = criteriaName.value.trim();
        const data = { name };

        if (currentId) {
            await fetch(`${API_URL}/${currentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentId, name })
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        modal.hide();
        loadData();
    });

    btnPatchCriteria.addEventListener('click', async () => {
        const name = criteriaName.value.trim();
        if (!currentId || !name) return;
        await fetch(`${API_URL}/${currentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        modal.hide();
        loadData();
    });

    async function loadData() {
        const res = await fetch(API_URL);
        const data = await res.json();

        tableBody.innerHTML = '';
        data.forEach(c => {
            if (c.active === false) return;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editCriteria(${c.id})"><i class="bi bi-pencil"></i></button>
                   
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    async function editCriteria(id) {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        currentId = data.id;
        criteriaId.value = data.id;
        criteriaName.value = data.name;
        modal.show();
    }

   




 async function searchCriteriaById() {
        const id = searchIdInput.value.trim();
        if (!id) return;

        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) {
                searchResult.className = 'alert alert-danger';
                searchResult.textContent = 'Criterio no encontrado.';
                searchResult.classList.remove('d-none');
                return;
            }

            const data = await res.json();
            searchResult.className = 'alert alert-success';
            searchResult.innerHTML = `<strong>ID:</strong> ${data.id} <br><strong>Nombre:</strong> ${data.name}`;
            searchResult.classList.remove('d-none');
        } catch (error) {
            searchResult.className = 'alert alert-danger';
            searchResult.textContent = 'Ocurrió un error al buscar el criterio.';
            searchResult.classList.remove('d-none');
        }
    }


