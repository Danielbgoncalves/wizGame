export default class Bad extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, positionX, positionY, imageNome, vida, bonus) {
        super(cena,  positionX, positionY, imageNome);

        // Definição de propriedades
        this.cena = cena;
        this.positionX = positionX;
        this.positionY = positionY;
        this.imageNome = imageNome;
        this.vida = vida;
        this.bonus = bonus;  
        this.vel = 15 * this.vida;

        // Adicionando o sprite à cena e ao sistema de física
        this.cena.add.existing(this);
        this.cena.physics.world.enable(this);

        this.uniqueId = Phaser.Math.RND.uuid();
        this.animacoes();
        ///this.play('anda')
    }



    animacoes() {
        this.cena.anims.create({
            key: this.uniqueId + '-tomaDano',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 2, end: 6 }),
            frameRate: 10,
            repeat: 0 // se repete 2 vezes
        });

        this.cena.anims.create({
            key: this.uniqueId + '-anda',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1 // se repete 2 vezes
        });

        this.cena.anims.create({
            key: this.uniqueId + '-morre',
            frames: this.cena.anims.generateFrameNumbers( this.imageNome, { start: 7, end: 8 }),
            frameRate: 8,
            repeat: 0 
        });
    }

    levarDano(dano, instantaneo) {
        this.vida -= dano;
        this.playAnimis('tomaDano');

        if (this.vida <= 0) {
            this.body.enable = false;
            this.playAnimis('morre');

            if(instantaneo){
                this.destroy();
            } else {
                let key = 'animationcomplete-' + this.uniqueId + '-morre';
                this.once(key, () => {
                    this.destroy();
                });
            }

            this.cena.ordaManager.atualiza();
            console.log('MORREU UM');
            this.cena.calculaPontuacao(this.bonus);

            /*if(this.cena.ordaManager.nasceNovaOrda()){
                this.cena.criaBads();
                console.log('classe vilao mandou criar mais viloes');
            }*/
        }
    }

    playAnimis(key){
        this.play(this.uniqueId + '-' + key);
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
