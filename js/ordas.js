export default class ordasManager {
    constructor(){
        this.ordas = [
            {nivel: 1, qtdViloes: 1},
            {nivel: 2, qtdViloes: 3},
            {nivel: 3, qtdViloes: 4},
            {nivel: 4, qtdViloes: 4},
            {nivel: 5, qtdViloes: 3},
            {nivel: 6, qtdViloes: 4},
            {nivel: 7, qtdViloes: 2},
            {nivel: 8, qtdViloes: 3},
            {nivel: 9, qtdViloes: 4},
        ];
        this.ordaAtual = 0;
    }

    atualiza(){ // Acessível por ordasManager.atualiza();
        let mudouAOrda = false
        console.log('qnt de viloes: ',this.ordas[this.ordaAtual].qtdViloes);
        if(this.ordas[this.ordaAtual].qtdViloes > 0){
            this.ordas[this.ordaAtual].qtdViloes--;
        }
        console.log('qnt de viloes: ',this.ordas[this.ordaAtual].qtdViloes);

        if(this.ordas[this.ordaAtual].qtdViloes === 0 && this.ordaAtual < this.ordas.length ){
            this.ordaAtual++;
            mudouAOrda = true;
        }
        return mudouAOrda;
    }

    get nivelAtual(){ // Acessível por ordasManager.nivelAtual;
        return this.ordas[this.ordaAtual].nivel;
    }

    get qntNesseNivel(){ 
        return this.ordas[this.ordaAtual].qtdViloes ;
    }



}