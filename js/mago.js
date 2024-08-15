export default class Mago {
    constructor(positionX, positionY, cena, quem, vida){
        
        this.cena = cena;
        this.positionX = positionX;
        this.positionY = positionY;
        this.vida = vida;
        this.coracoes = [];
        this.poderes = [];

        this.sprite = this.cena.physics.add.sprite(this.positionX, this.positionY, quem);
        this.sprite.setCollideWorldBounds(true)
        
        this.configuraAnims();
    }

    configuraAnims(){
        this.cena.anims.create({
            key: 'mago-idle',
            frames: this.cena.anims.generateFrameNumbers('mago', { start: 0, end: 1}),
            frameRate: 4,
            repeat: -1 // se repete infinitamente
        });

        this.cena.anims.create({
            key: 'mago-ansioso',
            frames: this.cena.anims.generateFrameNumbers('mago', { start: 2, end: 3}),
            frameRate: 5,
            repeat: -1
        });

        this.cena.anims.create({
            key: 'mago-morre',
            frames: this.cena.anims.generateFrameNumbers('mago', { start: 4, end: 6}),
            frameRate: 5,
            repeat: 0
        });

        this.cena.anims.create({
            key: 'mago-tomaDano',
            frames: this.cena.anims.generateFrameNumbers('mago', { start: 7, end: 9}),
            frameRate: 12,
            repeat: 0
        });

        /*this.cena.anims.create({
            key: 'lancaPoder',
            frames: this.cena.anims.generateFrameNumbers('mago', { start: 4, end: 5}),
            frameRate: 10,
            repeat: 1
        });        Fazer ainda ne */

    }

    levarDano(dano){
        this.playAnims('mago-tomaDano');
        this.sprite.once('animationcomplete-mago-tomaDano', () => {
            this.playAnims('mago-idle');
        });

        this.vida -= dano;
        this.perdeUmVida();

        if(this.vida < 1){
            this.playAnims('mago-morre');
            this.sprite.once('animationcomplete-morre', () => {
                console.log('Você perdeu');
            });
        }
    }

    perdeUmVida(){
        let coracao = this.coracoes.pop();
        coracao.setVisible(false);
    }

    perdeUmPoder(){
        if(this.poderes.length > 0){
            let poder = this.poderes.pop();
            poder.destroy();
        }
        
    }

    playAnims(animationKey){
        this.sprite.play(animationKey);
    }
    
}