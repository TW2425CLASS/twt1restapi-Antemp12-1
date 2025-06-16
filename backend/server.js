const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoDB_URI = 'mongodb+srv://Antemp:1234@tecweb.o7qlkzt.mongodb.net/?retryWrites=true&w=majority&appName=TecWeb';
const DB_NAME = 'alunosCurso';

let db, alunosCollection, cursosCollection;

MongoClient.connect(MongoDB_URI)
  .then(client => {
    db = client.db(DB_NAME);
    alunosCollection = db.collection('alunos');
    cursosCollection = db.collection('cursos');
    console.log('✅ Conectado ao MongoDB Atlas');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

/* --- Endpoints de Alunos --- */
app.get('/alunos', async (req, res) => {
  const alunos = await alunosCollection.find().toArray();
  const formatados = alunos.map(a => {
    let id = a.id;
    if (typeof id !== 'number') {
      // tenta converter para número, se possível
      id = parseInt(a.id) || a._id?.toString();
    }
    return {
      ...a,
      id,
      _id: undefined
    };
  });
  res.json(formatados);
});

app.post('/alunos', async (req, res) => {
  const count = await alunosCollection.countDocuments();
  const aluno = {
    ...req.body,
    id: count + 1
  };
  await alunosCollection.insertOne(aluno);
  res.status(201).json(aluno);
});

app.put('/alunos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const novo = req.body;
  const result = await alunosCollection.findOneAndUpdate(
    { id },
    { $set: novo },
    { returnDocument: 'after' }
  );
  if (!result || !result.value) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(result.value);
});

app.delete('/alunos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await alunosCollection.deleteOne({ id });
  res.status(204).send();
});

/* --- Endpoints de Cursos --- */
app.get('/cursos', async (req, res) => {
  const cursos = await cursosCollection.find().toArray();
  const formatados = cursos.map(c => {
    let id = c.id;
    if (typeof id !== 'number') {
      id = parseInt(c.id) || c._id?.toString();
    }
    return {
      ...c,
      id,
      _id: undefined
    };
  });
  res.json(formatados);
});

app.post('/cursos', async (req, res) => {
  const count = await cursosCollection.countDocuments();
  const curso = {
    ...req.body,
    id: count + 101
  };
  await cursosCollection.insertOne(curso);
  res.status(201).json(curso);
});

app.put('/cursos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const novo = req.body;
  const result = await cursosCollection.findOneAndUpdate(
    { id },
    { $set: novo },
    { returnDocument: 'after' }
  );
  if (!result || !result.value) return res.status(404).json({ error: 'Curso não encontrado' });
  res.json(result.value);
});

app.delete('/cursos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await cursosCollection.deleteOne({ id });
  res.status(204).send();
});

/* --- Inicialização do Servidor --- */
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Servidor a correr em http://localhost:${PORT}`));