# Gestão de Alunos e Cursos

**Autor:** Tomás Franco Amorim 
**Número:** 31371

---

## Publicação

- **Frontend:** [https://vercel.com/antemp12s-projects/twt1restapi-antemp12-1]
- **Backend:** [https://twt1restapi-antemp12-1.onrender.com]

---

## Instalação e Execução

### Pré-requisitos
- Node.js (versão recomendada LTS)
- npm
- Conta MongoDB Atlas (para backend real)

### Backend

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a string de conexão do MongoDB Atlas em `server.js`.
4. Inicie o servidor:
   ```bash
   node server.js
   ```
   O backend ficará disponível em `http://localhost:3001`.

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Abra o arquivo `index.html` no navegador  
   **ou** use uma extensão como Live Server do VS Code.

---

## Descrição da Base de Dados

- **MongoDB Atlas** com duas coleções:
  - **alunos**:  
    - `nome` (String)  
    - `apelido` (String)  
    - `cursoID` (Number)  
    - `anoCurricular` (Number)
  - **cursos**:  
    - `nome` (String)  
    - `descricao` (String)

---

## Descrição da API (Rotas)

### Alunos

- `GET    /alunos`  
  Lista todos os alunos

- `POST   /alunos`  
  Cria um novo aluno  
  **Body:** `{ nome, apelido, cursoID, anoCurricular }`

- `PUT    /alunos/:id`  
  Atualiza um aluno existente  
  **Body:** `{ nome, apelido, cursoID, anoCurricular }`

- `DELETE /alunos/:id`  
  Remove um aluno

### Cursos

- `GET    /cursos`  
  Lista todos os cursos

- `POST   /cursos`  
  Cria um novo curso  
  **Body:** `{ nome, descricao }`

- `PUT    /cursos/:id`  
  Atualiza um curso existente  
  **Body:** `{ nome, descricao }`

- `DELETE /cursos/:id`  
  Remove um curso

---

## Descrição do Frontend

- Interface web responsiva para gestão de alunos e cursos.
- Permite adicionar, editar e remover alunos e cursos.
- Os dados são consumidos da API RESTful.
- Modal para edição de alunos/cursos.
- Dropdown para seleção de curso ao criar/editar aluno.
- Visual moderno e intuitivo.

---

## Outros Conteúdos Relevantes

- Projeto desenvolvido para a unidade curricular de Tecnologias Web.
- Estrutura RESTful e separação clara entre frontend e backend.
- Código comentado e organizado para fácil manutenção.
- [Opcional] Testes automáticos incluídos na pasta `/tests`.

