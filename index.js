const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000; 

const uri = process.env.MONGODB_URI ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conectando ao MongoDB uma vez ao iniciar o servidor
let db;
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB! e seu uri é: ', uri);
    db = client.db('ranking'); // Guarde a referência ao banco de dados
  } catch (error) {
    console.error('Erro ao conectar no MongoDB', error);
  }
}

connectToDatabase();

const allowedOrigins = ['http://127.0.0.1:5500', 'https://danielbgoncalves.github.io', 'https://danielbgoncalves.github.io/wizGame/'];

const corsOption = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

app.post('/ranking', async (req, res) => {
  try {
    let { nome, pontuacao, id, horario } = req.body;

    if (!nome || typeof pontuacao !== 'number') {
      return res.status(400).json({ message: 'nome ou pontuacao invalidos' });
    }

    const collection = db.collection('players-ranking');

    const jogador = await collection.findOne({ id });

    if (jogador) {
      if (jogador.pontuacao < pontuacao) {
        await collection.updateOne({ id }, { $set: { pontuacao } });
      }
    } else {
      await collection.insertOne({ nome, pontuacao, id, horario});
    }

    res.status(201).json({ message: 'Dados enviados com sucesso' });
  } catch (error) {
    console.error('Erro ao processar ranking no servidor', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.get('/ranking', async (req, res) => {
  try {
    const collection = db.collection('players-ranking');
    const rankingOrdenado = await collection.find().sort({ pontuacao: -1 }).toArray();
    res.status(200).json(rankingOrdenado);
  } catch (error) {
    console.error('Erro ao buscar ranking: ', error);
    res.status(500).json({ message: 'Erro ao buscar ranking' });
  }
});

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
