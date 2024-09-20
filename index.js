const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

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

  const ranking = [];
  app.post('/api/ranking', (req, res) => {
    try{
        let {nome, pontuacao, id} = req.body;
        let jogadorJaPresente = false;

        if(!nome || typeof pontuacao != 'number'){
            return res.status(400).json({message: 'nome ou pontuacao invalidos'});
        }

        ranking.forEach((jogador) => {
            if(jogador.id === id){
              if(jogador.pontuacao < pontuacao) jogador.pontuacao = pontuacao;
              jogadorJaPresente = true;
            }
        })

        if(!jogadorJaPresente){
          ranking.push({nome, pontuacao, id});
        }
        
        res.status(201).json({message: 'Dados enviados com sucesso'});

    } catch (error){
        console.error('Erro ao buscar o ranking no servidor');
        res.status(500).json({message: 'Erro do servidor ao processar sacola'});
    }
  });

  app.get('/api/ranking',(req, res) => {

    try{
        let rankingOrdenado = ranking.sort((a,b) => b.pontuacao - a.pontuacao);
        res.status(200).json(rankingOrdenado);
    } catch(error){
        console.error('Erro ao buscar ranking: ', error);
        res.status(500).json({message:'Erro ao buscar ranking'});
    }

  })

  app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});

