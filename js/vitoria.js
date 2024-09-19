import Mago from './mago.js';
import {enviarPartida, receberRanking} from './ranking.js';


export default class extends Phaser.Scene{
    constructor(){
        super({key: "CenaVitoria"})
    }

    preload(){
        this.load.image("fundo_vitoria", "Assets/vitoria.png");

    }

    create(){
        this.add.image(425, 225, 'fundo_vitoria');
        this.cameras.main.fadeIn(800, 0, 0, 0);
        //this.musica

        let cenaStart = this.scene.get("Start");
        let nome = cenaStart.nomeDoJogador;
        let id = cenaStart.id;

        let cenaPrincipal = this.scene.get("CenaPrincipal");
        let pontuacao = cenaPrincipal.pontuacao.score;

        this.mago = new Mago(280, 115, this, 'mago', 3, 0);
        this.mago.sprite.setScale(1.5);
        this.mago.playAnims('mago-idle');
        
        enviarPartida({nome, pontuacao, id})
        this.time.delayedCall(400, () => {
            receberRanking();
        })

        this.input.on('pointerdown', (pointer) => {
            if(pointer.x > 215 && pointer.x < 325
                && pointer.y > 360  && pointer.y < 410){
                    //this.musica.stop();
                    this.scene.start('CenaPrincipal');
                }
        });

    }

    update(){}
}