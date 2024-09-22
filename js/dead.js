import Mago from './mago.js';
import {enviarPartida, receberRanking} from './ranking.js';

export default class Dead extends Phaser.Scene{
    constructor(){
        super({key: "DeadScene"});
    }

    preload(){
        this.load.image("fundo_morreu", "Assets/perdeu.png");
        this.load.audio('deadSong', 'Assets/soundtrack3.mp3');
        this.load.spritesheet('mago', 'Assets/mago.png', {frameWidth: 38, frameHeight: 49} );

    }

    create(){
        
        this.musica = this.sound.add('deadSong');
        this.musica.play();
        this.musica.loop = true;
        this.musica.volume = 0.6;

        this.add.image(425, 225,"fundo_morreu");
        
        let cenaStart = this.scene.get("Start");
        let nome = cenaStart.nomeDoJogador;
        let id = cenaStart.id;

        let cenaPrincipal = this.scene.get("CenaPrincipal");
        let pontuacao = cenaPrincipal.pontuacao.score;
        
       // let nome = 'Daniel'
        this.add.text(465, 190, nome + ",", {
            fontSize: '35px',
            fill: '#ffffff',
            fontStyle: 'Bold'
        });

        this.mago = new Mago(260, 100, this, 'mago', 3, 0);
        //this.mago.sprite.angle = -130;
        this.mago.sprite.setScale(1.5);
        this.mago.playAnims('mago-idle');
        
        enviarPartida({nome, pontuacao, id})
        this.time.delayedCall(800, () => {
            receberRanking();
        })  
        
        this.input.on('pointerdown', (pointer) => {
            if(pointer.x > 455 && pointer.x < 570
                && pointer.y > 368  && pointer.y < 415){
                    this.musica.stop();
                    this.scene.start('CenaPrincipal');
                }
        });
        
            //64d2dd0b-37f3-423b-ab8b-133e5b9b6758
            //
    }

    

    update(){}
}