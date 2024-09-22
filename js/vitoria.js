import Mago from './mago.js';
import {enviarPartida, receberRanking} from './ranking.js';


export default class extends Phaser.Scene{
    constructor(){
        super({key: "CenaVitoria"})
    }

    preload(){
        this.load.image("fundo_vitoria", "Assets/vitoria.png");
        this.load.audio('soundtrack2', 'Assets/soundtrack2.mp3');

    }

    create(){
        this.add.image(425, 225, 'fundo_vitoria');
        this.cameras.main.fadeIn(900, 0, 0, 0);

        this.musica = this.sound.add('soundtrack2');
        this.musica.play();
        this.musica.loop = true;
        this.musica.volume = 0.6;

        //this.musica

        let cenaStart = this.scene.get("Start");
        let nome = cenaStart.nomeDoJogador;
        let id = cenaStart.id;

        let cenaPrincipal = this.scene.get("CenaPrincipal");
        let pontuacao = cenaPrincipal.pontuacao.score;

        this.mago = new Mago(270, 125, this, 'mago', 3, 0);
        this.mago.sprite.setScale(1.5);
        this.mago.playAnims('mago-idle');
        
        this.sendUpdates({nome, pontuacao, id})
        enviarPartida()
        this.time.delayedCall(800, () => {
            
        })

        this.input.on('pointerdown', (pointer) => {
            if(pointer.x > 215 && pointer.x < 325
                && pointer.y > 360  && pointer.y < 410){
                    this.musica.stop();
                    this.scene.start('CenaPrincipal');
                }
        });

    }

    async sendUpdates(dadosJogador){
        await enviarPartida(dadosJogador);
        receberRanking();
    }

    update(){}
}