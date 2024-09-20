const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI || 'mongodb://mongo:yvTehVZQAfLeKJItQVWkNyDWkjkhkdvS@junction.proxy.rlwy.net:26846';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB', error);
  }
}

connectToDatabase();

const allowedOrigins = ['http://127.0.0.1:5500', 'https://danielbgoncalves.github.io'];

const corsOption = {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true); // Permite solicitações sem origem (ex. mobile apps, etc.)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200 // alguns browsers usam 204
  };
  //Admito que a parte em cima foi feita por ia, eu não tinha ideia de como fazer isso 

  app.use(cors(corsOption));
  app.use(express.json());

  //const ranking = [];
  app.post('/api/ranking', async (req, res) => {
    try{
        let {nome, pontuacao, id} = req.body;
        //let jogadorJaPresente = false;

        if(!nome || typeof pontuacao != 'number'){
            return res.status(400).json({message: 'nome ou pontuacao invalidos'});
        }

        const db = client.db('ranking');
        const collection = db.collection('players-ranking');

        const jogador = await collection.findOne({ id });

        if(jogador){
          if(jogador.pontuacao < pontuacao){
            await collection.updateOne({ id }, { $set: { pontuacao }});
          }
        } else {
          await collection.insertOne({ nome, pontuacao, id });
        }
        
        res.status(201).json({message: 'Dados enviados com sucesso'});
    } catch (error){
        console.error('Erro ao buscar o ranking no servidor', error);
        res.status(500).json({message: 'Erro do servidor ao processar sacola'});
    }
  });

  app.get('/api/ranking', async (req, res) => {

    try{
        const db = client.db('ranking');
        const collection = db.collection('players-ranking'); 

        const rankingOrdenado = await collection.find().sort({pontuacao:-1}).toArray();
        
        res.status(200).json(rankingOrdenado);
    } catch(error){
        console.error('Erro ao buscar ranking: ', error);
        res.status(500).json({message:'Erro ao buscar ranking'});
    }

  })

  app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});

