export default class Dicas extends Phaser.Scene {
    constructor(){
        super({ key: "CenaDicas"})
    }

    preload(){
        this.load.image('fundoDicas', 'Assets/dicas.png');
        //this.load.audio('somDaHora', 'Assets/somDaHora.mp3');
    }

    create(){
        this.add.image(425, 225, 'fundoDicas');
        //this.musica = this.sound.add('somDaHora');
        //this.musica.play();
        //this.musica.loop = true;
        //this.musica.volume = 0.2;
        let cenaStart = this.scene.get("Start");
        this.musica = cenaStart.musica;

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.input.on('pointerDown', () => {
            this.musica.stop();
            this.scene.start('CenaPrincipal');
        });

    }

    update(){
        if(this.enter.isDown){
            this.musica.stop();
            this.scene.start('CenaPrincipal');
        }
    }
}