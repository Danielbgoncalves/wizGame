import Start from './start.js' ;
import CenaPrincipal from './game.js';

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
        CenaPrincipal
    ]
}

const jogo = new Phaser.Game(config);