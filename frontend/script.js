const API_URL = "https://twt1restapi-antemp12-1.onrender.com";

// Guarda os cursos para usar em vários sítios
let cursosGlobais = [];

// Fetch and display Alunos
async function fetchAlunos() {
    const response = await fetch(`${API_URL}/Alunos`);
    const alunos = await response.json();
    renderAlunos(alunos);
}

// Fetch and display Cursos
async function fetchCursos() {
    const response = await fetch(`${API_URL}/Cursos`);
    const cursos = await response.json();
    cursosGlobais = cursos; // Guarda globalmente
    renderCursos(cursos);
    preencherDropdownCursos(cursos); // Preenche o dropdown de cursos
}

// Render Alunos
function renderAlunos(alunos) {
    const ul = document.getElementById('alunos-list');
    ul.innerHTML = '';
    alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.className = 'list-item-flex';
        li.innerHTML = `
    <span>
        ${aluno.nome} ${aluno.apelido} 
        (Curso ID: ${aluno.cursoID}, Ano: ${aluno.anoCurricular})
    </span>
    <span class="actions">
        <button class="edit-btn" title="Editar">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6v-3a2 2 0 012-2h3"></path></svg>
            Editar
        </button>
        <button class="delete-btn" title="Excluir">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
            Excluir
        </button>
    </span>
`;
        li.querySelector('.edit-btn').onclick = () => {
            console.log('Edit clicked', aluno); // or curso
            openEditModal('aluno', aluno); // or 'curso', curso
        };
        li.querySelector('.delete-btn').onclick = () => deleteAluno(aluno.id);
        ul.appendChild(li);
    });
}

// Render Cursos
function renderCursos(cursos) {
    const ul = document.getElementById('cursos-list');
    ul.innerHTML = '';
    cursos.forEach(curso => {
        const li = document.createElement('li');
        li.className = 'list-item-flex';
        li.innerHTML = `
            <span>${curso.id}: ${curso.nome}</span>
            <span class="actions">
                <button class="edit-btn" title="Editar">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6v-3a2 2 0 012-2h3"></path></svg>
                    Editar
                </button>
                <button class="delete-btn" title="Excluir">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="22" height="22"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                    Excluir
                </button>
            </span>
        `;
        li.querySelector('.edit-btn').onclick = () => openEditModal('curso', curso);
        li.querySelector('.delete-btn').onclick = () => deleteCurso(curso.id);
        ul.appendChild(li);
    });
}

// Delete functions
async function deleteAluno(id) {
    await fetch(`${API_URL}/Alunos/${id}`, { method: "DELETE" });
    fetchAlunos();
}
async function deleteCurso(id) {
    await fetch(`${API_URL}/Cursos/${id}`, { method: "DELETE" });
    fetchCursos();
}

// Preenche o dropdown de cursos no formulário de aluno
function preencherDropdownCursos(cursos) {
    const select = document.getElementById('cursoId');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione um curso</option>';
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nome;
        select.appendChild(option);
    });
}

// Preenche o dropdown de cursos na modal de edição
function preencherDropdownCursosModal(cursos, selectedId) {
    const select = document.createElement('select');
    select.id = 'modal-edit-cursoId';
    select.required = true;
    select.innerHTML = '<option value="">Selecione um curso</option>';
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nome;
        if (curso.id == selectedId) option.selected = true;
        select.appendChild(option);
    });
    return select;
}

// Modal logic (edit)
function openEditModal(type, data) {
    document.getElementById('edit-modal').style.display = 'block';
    const modalTitle = document.getElementById('modal-title');
    const modalFields = document.getElementById('modal-fields');
    modalFields.innerHTML = '';

    if (type === 'aluno') {
        modalTitle.textContent = 'Editar Aluno';
        // Cria os campos
        modalFields.innerHTML = `
            <input type="hidden" id="modal-edit-id" value="${data.id || ''}">
            <input type="text" id="modal-edit-nome" placeholder="Nome" required value="${data.nome || ''}">
            <input type="text" id="modal-edit-apelido" placeholder="Apelido" required value="${data.apelido || ''}">
            <div id="modal-curso-dropdown"></div>
            <input type="number" id="modal-edit-anoCurricular" placeholder="Ano Curricular" required value="${data.anoCurricular || ''}">
        `;
        // Adiciona o dropdown de cursos
        const dropdown = preencherDropdownCursosModal(cursosGlobais, data.cursoID);
        document.getElementById('modal-curso-dropdown').appendChild(dropdown);
    } else if (type === 'curso') {
        modalTitle.textContent = 'Editar Curso';
        modalFields.innerHTML = `
            <input type="hidden" id="modal-edit-id" value="${data.id || ''}">
            <input type="text" id="modal-edit-nome" placeholder="Nome do Curso" required value="${data.nome || ''}">
        `;
    }
    document.getElementById('modal-edit-form').dataset.type = type;
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}
document.getElementById('close-modal').onclick = closeEditModal;
window.onclick = function(event) {
    if (event.target == document.getElementById('edit-modal')) {
        closeEditModal();
    }
};
document.getElementById('modal-edit-form').onsubmit = async function(e) {
    e.preventDefault();
    const type = e.target.dataset.type;
    const id = document.getElementById('modal-edit-id').value;
    if (type === 'aluno') {
        const nome = document.getElementById('modal-edit-nome').value;
        const apelido = document.getElementById('modal-edit-apelido').value;
        const cursoID = document.getElementById('modal-edit-cursoId').value;
        const anoCurricular = document.getElementById('modal-edit-anoCurricular').value;
        await fetch(`${API_URL}/Alunos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, apelido, cursoID: parseInt(cursoID), anoCurricular: parseInt(anoCurricular) })
        });
        fetchAlunos();
    } else if (type === 'curso') {
        const nome = document.getElementById('modal-edit-nome').value;
        await fetch(`${API_URL}/Cursos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome })
        });
        fetchCursos();
    }
    closeEditModal();
};

document.getElementById('add-aluno-form').onsubmit = async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const apelido = document.getElementById('apelido').value;
    const cursoID = document.getElementById('cursoId').value;
    const anoCurricular = document.getElementById('anoCurricular').value;
    await fetch(`${API_URL}/Alunos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, apelido, cursoID: parseInt(cursoID), anoCurricular: parseInt(anoCurricular) })
    });
    // Clear form fields
    document.getElementById('nome').value = '';
    document.getElementById('apelido').value = '';
    document.getElementById('cursoId').value = '';
    document.getElementById('anoCurricular').value = '';
    // Refresh the list
    fetchAlunos();
};
document.getElementById('add-curso-form').onsubmit = async function(e) {
    e.preventDefault();
    const nome = document.getElementById('curso-nome').value;
    const descricao = document.getElementById('curso-descricao').value;

    await fetch(`${API_URL}/Cursos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, descricao })
    });

    // Limpa o formulário
    document.getElementById('curso-nome').value = '';
    document.getElementById('curso-descricao').value = '';

    // Atualiza a lista de cursos
    fetchCursos();
};

// Initial load
fetchAlunos();
fetchCursos();