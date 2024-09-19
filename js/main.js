import Start from './start.js' ;
import Dicas from './dicas.js';
import CenaPrincipal from './game.js';
import DeadScene from './dead.js';
import CenaVitoria from './vitoria.js';

const config = {
    type: Phaser.AUTO,
    width: 850,
    height: 450,
    parent: 'canvas',
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: [
        Start,
        Dicas,
        CenaPrincipal,
        DeadScene,
        CenaVitoria
    ]
}

const jogo = new Phaser.Game(config);