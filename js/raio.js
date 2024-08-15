export default class Raio extends Phaser.Physics.Arcade.Sprite{
    constructor(cena, positionX, positionY, imagemName, angulo){
        super(cena, positionX, positionY, imagemName );

        this.cena = cena;
        this.positionX = positionX;
        this.positionY = positionY;
        this.anguloEmDeg = angulo;
        this.cena.add.existing(this);
        this.cena.physics.add.existing(this);

        this.disparar();        
    }

    disparar(){
        const max = 300;
        const anguloEmRadianos = Phaser.Math.DegToRad( this.anguloEmDeg);
        this.setVelocityX(max * Math.cos(anguloEmRadianos));
        this.setVelocityY(max * Math.sin(anguloEmRadianos));
    }

    update(){
        if(this.positionX < 0 || this.positionX > 850 || this.positionY < 0 || this.positionY > 450){
            this.detroy();
        }
    }
}