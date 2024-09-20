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

        
    }


    preload(){
        //this.load.image('intro-porta', 'Assets/cenaIntro/intro-porta.png');
        this.load.image('fundo', 'Assets/fundo-maior.png');
        this.load.image('mapa', 'Assets/mapa.png');
        this.load.image('mira', 'Assets/mira.png');
        this.load.image('raio', 'Assets/raio.png');
        this.load.image('coracao', 'Assets/coracao.png');
        this.load.image('tesouro', 'Assets/tesouro.png');
        this.load.spritesheet('bad', 'Assets/bad.png', {frameWidth: 38, frameHeight: 49} );
        this.load.spritesheet('bad-blue', 'Assets/bad-blue.png', {frameWidth: 38, frameHeight: 49} );
        this.load.audio('soundtrack', 'Assets/soundtrack.m4a');
    }

    create(){
        this.ordaManager = new Orda(this); 
        this.pontuacao = {
            score: 0,
            timeSinceLastKill: 0,
            bonus: 0
        };
        this.tempoInicial = 0;
        
        this.musica = this.sound.add('soundtrack');
        this.musica.play();
        this.musica.loop = true;
        this.musica.volume = 0.8;
   
        this.numrDeTesouros = 0;
        this.raiosArray = [];

        this.add.image(meioX, meioY , 'fundo');

        this.mago = new Mago(meioX, meioY, this, 'mago', 3, 0);
        this.mago.playAnims('mago-mtAnsioso');

        this.mago.mira = this.add.image(this.mago.sprite.x, this.mago.sprite.y, 'mira');
        this.mago.mira.setOrigin(0, 0.5);

        this.criaCursor();
        this.pointerDown();

        this.criaGrupoRaios();
        this.criaGrupoBads();
        this.criaGrupoBlueBads();
        this.surgeTesouro();
        
        this.physics.add.overlap(this.grupoRaios, this.grupoBads, this.colisaoDosRaios, null, this);
        this.physics.add.overlap(this.grupoRaios, this.grupoBlueBads, this.colisaoDosRaios, null, this);
        this.physics.add.overlap(this.grupoBads, this.mago.sprite, this.colisaoDosBadseMago, null, this);
        this.physics.add.overlap(this.grupoBlueBads, this.mago.sprite, this.colisaoDosBadseMago, null, this);

        this.criaBads(3);
        this.desenhaCoracoes();
        this.desenhaPoderes();
        this.atualizaVisibilidadePoderes();

        this.ordaText = this.add.text(16, 375,  'Orda:  1/12', { fontSize: '20px', fill: '#000' });
        this.scoreText = this.add.text(16, 395, 'Score: 0', { fontSize: '20px', fill: '#000' });
    }

    pointerDown(){
        this.input.on('pointerdown', () => {
            
            if(this.mago.qntPoderes == 2 && this.numrDeTesouros == 0){
                this.surgeTesouro();
            } 

            if(this.mago.qntPoderes > 0){
                let mago = this.mago.sprite;
                let raio = this.grupoRaios.get(mago.x, mago.y, 'raio', this.mago.mira.angle);

                raio.disparar();
                this.mago.perdeUmPoder();
                this.atualizaVisibilidadePoderes();
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

    criaGrupoBlueBads(){
        this.grupoBlueBads = this.physics.add.group({
            classType: Bad,
            runChildUpdate: true,
            allowGravity: false
        });
    }

    criaBads(){
        
        if(this.ordaManager.ordaAtual  ==  4 /*this.ordaManager.ordas.length - 1*/){
            this.cameras.main.fadeOut(800, 0, 0, 0);
            this.musica.stop();
            this.scene.start("CenaVitoria");
        }
        
        //console.log(`Passou pq era orda ${this.ordaManager.ordaAtual - 1} e a orda limite era ${this.ordaManager.ordas.length - 1}`);
        
        let quantos = this.ordaManager.qntNesseNivel;
        let cor = this.ordaManager.cor;
            
        
        while(quantos > 0){
            let randX = this.aleatorioX(-20, 870);
            let randY = this.aleatorioY(-20, 470);
            
            let badAleatorio;
            if(cor === 'red'){
                badAleatorio = this.grupoBads.get(randX, randY, 'bad', 3, 1);
            } else if (cor === 'blue'){
                badAleatorio = this.grupoBlueBads.get(randX, randY, 'bad-blue', 4, 10); // estão pegamdo a animação dos vermelhos ai ficam vermelhos tb 
            }

            quantos--;
        }

        
        
    }

    colisaoDosRaios(projetil, alvo){
        projetil.destroy();
        alvo.levarDano(1, false); // ataque de um 
    }

    colisaoDosBadseMago(mago, bad){
        let morreu = this.mago.levarDano(1); // Dano de 1
        bad.levarDano(5, true); // maior q a vida dos bads
        if(morreu){
            this.musica.stop();
            this.scene.start("DeadScene");
        }
            
    }

    desenhaCoracoes(){
        for(let i = 0; i < 3; i++){
            let coracao = this.add.image(30 + i*40, 430, 'coracao');
            this.mago.coracoes.push(coracao);
        }
    }

    desenhaPoderes(){
        for(let i = 0; i < 20; i++){
            let raio = this.add.image(20 + i*20, 20, 'raio');
            this.raiosArray.push(raio);
        }
    }

    atualizaVisibilidadePoderes(){
        for(let i = 0; i < 20; i++){
            if( i < this.mago.qntPoderes){
                this.raiosArray[i].setVisible(true);
            } else {
                this.raiosArray[i].setVisible(false);
            }
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

        this.tesouroCollider = this.physics.add.overlap(
            this.mago.sprite,
            this.tesouro,
            this.colisaoDoTesouro, // mandam por padrão como parametros os dois corpos da colisao 
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

    }

    colisaoDoTesouro(quemColidiu, corpoColidido){
        if(quemColidiu === 'raio'){
            this.addExtraScore(20);
        } else {
            this.addExtraScore(5);
        }

        if(this.tesouro){
            this.tesouro.destroy();
            this.tesouro = null;
        }
        

        this.numrDeTesouros--;
        this.mago.qntPoderes += 8;
        this.atualizaVisibilidadePoderes();
    }

    updateScore(){
        this.scoreText.setText(`Score: ${this.pontuacao.score}`);
        this.ordaText.setText(`Orda: ${this.ordaManager.ordaAtual+1}/12`);
    }

    calculaPontuacao(){
        //let timeAtual = this.time.now;
        let timeAtual = this.tempoInicial != 0 ? this.time.now : this.tempoInicial; 
        let delayEntreAbates = timeAtual - this.pontuacao.timeSinceLastKill;
        this.pontuacao.timeSinceLastKill = timeAtual;
        this.tempoInicial = timeAtual;

        this.pontuacao.score += 100;
        this.pontuacao.score -= Math.floor(delayEntreAbates / 150);
        this.pontuacao.score += this.pontuacao.bonus;

        this.updateScore();
    }

    addExtraScore(pontos){
        this.pontuacao.score += pontos;
        this.updateScore(); 
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
