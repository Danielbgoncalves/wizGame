import Mago from './mago.js'; 

export default class Start extends Phaser.Scene {
    constructor(){
        super({
            key: "Start"
        })
    }

    preload(){
        this.load.spritesheet('mago', 'Assets/mago.png', {frameWidth: 38, frameHeight: 49} );
        this.load.image('background', 'Assets/fundo.png');
        this.load.audio('soundtrack1', 'Assets/soundtrack1.mp3');
    }

    create(){
        this.add.image(425, 275, 'background');

        this.musica = this.sound.add('soundtrack1');
        this.musica.play();
        this.musica.loop = true;

        this.mago = new Mago(270, 195, this, 'mago', 3, 0);
        this.mago.sprite.setScale(1.1)
        this.mago.playAnims('mago-mtAnsioso');

        // Texto que irá mostrar o nome digitado
        this.nomeDoJogador = '';
        this.id = Phaser.Math.RND.uuid(); 

        // Criação do texto para mostrar o nome
        this.textoDeEntrada = this.add.text(450, 430, 'Digite seu nome: ', {
            fontSize: '22px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Configura o input do teclado
        this.input.keyboard.on('keydown', this.onKeyDown, this);

        // Adiciona um cursor para o texto
        this.cursor = this.add.text(this.textoDeEntrada.x + this.textoDeEntrada.width / 2 + 10, 430, '|', { // genial, tá !?
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Atualiza o cursor piscando
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.cursor.visible = !this.cursor.visible;
            },
            loop: true
        });

    }

    onKeyDown(event) {

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.nomeDoJogador.length > 0) {
            this.nomeDoJogador = this.nomeDoJogador.slice(0, -1);
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            this.scene.start('CenaDicas');
        } else if (event.key.length === 1) {
            this.nomeDoJogador += event.key;
        }

        // Atualiza o texto para mostrar o nome digitado
        this.textoDeEntrada.setText('Digite seu nome: ' + this.nomeDoJogador);
        this.cursor.setX(this.textoDeEntrada.x + this.textoDeEntrada.width / 2 + 10);
    }

    update(){

    }
}
