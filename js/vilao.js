export default class Bad extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, positionX, positionY, imageNome, vida) {
        super(cena,  positionX, positionY, imageNome);

        // Definição de propriedades
        this.cena = cena;
        this.positionX = positionX;
        this.positionY = positionY;
        this.imageNome = imageNome;
        this.vida = vida;
        
        this.vel = 15 * this.vida;

        //this.podeAndar = true;
        

        // Adicionando o sprite à cena e ao sistema de física
        this.cena.add.existing(this);
        this.cena.physics.world.enable(this);

        this.animacoes();
        this.play('anda')
    }



    animacoes() {
        this.cena.anims.create({
            key: 'tomaDano',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 2, end: 6 }),
            frameRate: 10,
            repeat: 0 // se repete 2 vezes
        });

        this.cena.anims.create({
            key: 'anda',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1 // se repete 2 vezes
        });

        this.cena.anims.create({
            key: 'morre',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 7, end: 8 }),
            frameRate: 8,
            repeat: 0 
        });
    }

    levarDano(dano, instantaneo) {
        this.vida -= dano;
        this.play('tomaDano');

        if (this.vida <= 0) {
            this.play('morre');

            if(instantaneo){
                this.destroy();
            } else {
                this.once('animationcomplete-morre', () => {
                    this.destroy();
                });
            }

            let novaOrda = this.cena.ordaManager.atualiza();
            if(novaOrda){
                this.cena.criaBads();
                console.log('criou novos bads');
            }

            this.cena.vilaoTeste = null;
        }
    }

    update(){   
        let mago = this.cena.mago.sprite;

        let deltaX = mago.x - this.x;
        let deltaY = mago.y - this.y;

        let angleRadian = Math.atan2(deltaY, deltaX);

        this.setVelocityX(0);
        this.setVelocityY(0);

        this.setVelocityX(this.vel * Math.cos(angleRadian));
        this.setVelocityY(this.vel * Math.sin(angleRadian));
        
    }



}
