import Mago from './mago.js';
import {enviarPartida, receberRanking} from './ranking.js';

export default class Dead extends Phaser.Scene{
    constructor(){
        super({key: "DeadScene"});
    }

    preload(){
        this.load.image("fundo_morreu", "Assets/perdeu.png");
        this.load.audio('deadSong', 'Assets/deadSong.mp3');
        this.load.spritesheet('mago', 'Assets/mago.png', {frameWidth: 38, frameHeight: 49} );

    }

    create(){
        
        let musica = this.sound.add('deadSong');
        musica.play();
        musica.volume = 0.3;

        this.add.image(425, 225,"fundo_morreu");
        
        let cenaStart = this.scene.get("Start");
        let nome = cenaStart.nomeDoJogador;
        let cenaPrincipal = this.scene.get("CenaPrincipal");
        let pontuacao = cenaPrincipal.pontuacao.score;
        
        
        this.add.text(90, 190, nome + ",", {
            fontSize: '40px',
            fill: '#ffffff',
            fontStyle: 'Bold'
        });

        this.mago = new Mago(750, 350, this, 'mago', 3, 0);
        this.mago.sprite.setScale(1.5);
        this.mago.playAnims('mago-idle');
        
        enviarPartida({nome, pontuacao})
        this.time.delayedCall(400, () => {
            receberRanking();
        })  
        
        
        
    }

    

    update(){}
}