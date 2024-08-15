import Mago from './mago.js';
import Raio from './raio.js';
import Bad from './vilao.js';
import Orda from './ordas.js'

const meioX = 425;
const meioY = 225;

export default class Game extends Phaser.Scene{
    constructor(){
        super({
            key: "CenaPrincipal"
        })

        this.ordaManager = new Orda; 
    }



    preload(){
        //this.load.image('intro-porta', 'Assets/cenaIntro/intro-porta.png');
        this.load.image('fundo', 'Assets/fundo-maior.png');
        this.load.image('mapa', 'Assets/mapa.png');
        this.load.image('mira', 'Assets/mira.png');
        this.load.image('raio', 'Assets/raio.png');
        this.load.image('coracao', 'Assets/coracao.png');
        this.load.image('tesouro', 'Assets/tesouro.png');
        this.load.spritesheet('bad', 'Assets/Bad.png', {frameWidth: 38, frameHeight: 49} );
        this.load.spritesheet('mago', 'Assets/mago.png', {frameWidth: 38, frameHeight: 49} );

        this.load.audio('soundtrack', 'Assets/soundtrack.m4a');
    }

    create(){
        let musica = this.sound.add('soundtrack');
        musica.play();
    
        this.numrDeTesouros = 0;

        this.add.image(meioX, meioY , 'fundo');

        this.mago = new Mago(meioX, meioY, this, 'mago', 3);
        this.mago.playAnims('mago-idle');

        this.mago.mira = this.add.image(this.mago.sprite.x, this.mago.sprite.y, 'mira');
        this.mago.mira.setOrigin(0, 0.5);

        this.criaCursor();
        this.pointerDown();

        this.criaGrupoRaios();
        this.criaGrupoBads();
        this.surgeTesouro();
        
        this.physics.add.overlap(this.grupoRaios, this.grupoBads, this.colisaoDosRaios, null, this);
        this.physics.add.overlap(this.grupoBads, this.mago.sprite, this.colisaoDosBadseMago, null, this);

        this.criaBads(3);
        this.desenhaCoracoes();
        this.desenhaPoderes(1);
        
        
    }

    pointerDown(){
        this.input.on('pointerdown', () => {
            
            if(this.mago.poderes.length == 2 && this.numrDeTesouros == 0){
                this.surgeTesouro();
            } 

            if(this.mago.poderes.length > 0){
                let mago = this.mago.sprite;
                let raio = this.grupoRaios.get(mago.x, mago.y, 'raio', this.mago.mira.angle);

                raio.disparar();
                this.mago.perdeUmPoder();
            }
                
        });
    }

    criaCursor(){
        this.cursor = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            rigth: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    criaGrupoRaios(){
        this.grupoRaios = this.physics.add.group({
            classType: Raio,
            runChildUpdate: true
        })
    }

    criaGrupoBads(){
        this.grupoBads = this.physics.add.group({
            classType: Bad,
            runChildUpdate: true,
            allowGravity: false
        });
    }

    criaBads(){
        let quantos = this.ordaManager.qntNesseNivel;
        
        while(quantos > 0){
            let randX = this.aleatorioX(-20, 870);
            let randY = this.aleatorioY(-20, 470);


            let badAleatorio = this.grupoBads.get(randX, randY, 'bad', 3);
            badAleatorio.play('anda');
            quantos--;
        }
        
    }

    colisaoDosRaios(projetil, alvo){
        console.log('colisao dos raios e bads');
        projetil.destroy();
        alvo.levarDano(1, false); // ataque de um 
    }

    colisaoDosBadseMago(mago, bad){
       //console.log('a')
        this.mago.levarDano(1); // Dano de 1
        bad.levarDano(5, true); // maior q a vida dos bads
    }

    desenhaCoracoes(){
        for(let i = 0; i < 3; i++){
            let coracao = this.add.image(30 + i*40, 430, 'coracao');
            this.mago.coracoes.push(coracao);
        }
    }

    desenhaPoderes(num){
        for(let i = 0; i < num; i++){
            let raio = this.add.image(20 + i*20, 20, 'raio');
            this.mago.poderes.push(raio);
        }
    }

    aleatorioX(min, max){
        let sorteadoX;
        let margem = 35;
        let aceito = true;
    
        do{
            aceito = true;
            sorteadoX = Math.floor(Math.random() * (max - min + 1) + min );
            if(sorteadoX > this.mago.sprite.x - margem && sorteadoX < this.mago.sprite.x + margem){
                aceito = false;
            }
        }while(!aceito)

        return sorteadoX;
    }

    aleatorioY(min, max){
        let sorteadoY;
        let margem = 30;
        let aceito = true;
    
        do{
            aceito = true;
            sorteadoY = Math.floor(Math.random() * (max - min + 1) + min );
            if(sorteadoY > this.mago.sprite.y - margem && sorteadoY < this.mago.sprite.y + margem){
                aceito = false;
            }
        }while(!aceito)

        return sorteadoY;
    }

    surgeTesouro(){
        this.numrDeTesouros++;

        let teasureX = this.aleatorioX(50, 800);
        let teasureY = this.aleatorioY(50, 400);

        if(this.tesouro){
            this.physics.world.removeCollider(this.tesouroCollider);
            this.physics.world.removeCollider(this.tesouroCollider2);
        }

        this.tesouro = this.physics.add.sprite(teasureX, teasureY, 'tesouro');

        //this.physics.add.overlap(this.mago.sprite, this.tesouro, this.colisaoDoTesouro, null, this);

        this.tesouroCollider = this.physics.add.overlap(
            this.mago.sprite,
            this.tesouro,
            this.colisaoDoTesouro,
            null,
            this
        );

        this.tesouroCollider2 = this.physics.add.overlap(
            this.grupoRaios,
            this.tesouro,
            this.colisaoDoTesouro,
            null,
            this
        );

        console.log('gerou os colisores ');
        console.log(this.tesouro);
    }

    colisaoDoTesouro(){
        if(this.tesouro){
            this.tesouro.destroy();
            this.tesouro = null;
        }
        

        this.numrDeTesouros--;
        this.desenhaPoderes(8);
    }

    update(){    
        let mago = this.mago.sprite;
        
        /* Atualiza posição do poder */
        this.mago.mira.x = mago.x;
        this.mago.mira.y = mago.y;

        /* Angulo da mira */
        let cursorX = this.input.activePointer.x 
        let cursorY = this.input.activePointer.y 

        let deltaX = cursorX - meioX;
        let deltaY = cursorY - meioY;

        let angleRadian = Math.atan2(deltaY, deltaX);
        let angleDegres = Phaser.Math.RadToDeg(angleRadian);

        this.mago.mira.angle = angleDegres;

        /*  Movimento do mago no mapa */  
        if(this.wasd.left.isDown){
            mago.setVelocityX(-100);
        } else if (this.wasd.rigth.isDown){
            mago.setVelocityX(100);
        } else {
            mago.setVelocityX(0);
        }

        if(this.wasd.up.isDown){
            mago.setVelocityY(-100);
        } else if (this.wasd.down.isDown){
            mago.setVelocityY(100);
        } else {
            mago.setVelocityY(0);
        }

    }
}