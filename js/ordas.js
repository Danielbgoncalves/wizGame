export default class ordasManager {
    constructor(cena){
        this.ordas = [
            {nivel:  1, qtdViloes: 1, cor: 'red'},
            {nivel:  2, qtdViloes: 2, cor: 'red'},
            {nivel:  3, qtdViloes: 2, cor: 'red'},
            {nivel:  4, qtdViloes: 3, cor: 'red'},
            {nivel:  5, qtdViloes: 3, cor: 'red'},
            {nivel:  6, qtdViloes: 3, cor: 'red'},
            {nivel:  7, qtdViloes: 3, cor: 'blue'},
            {nivel:  8, qtdViloes: 4, cor: 'blue'},
            {nivel:  9, qtdViloes: 4, cor: 'red'},
            {nivel: 10, qtdViloes: 4, cor: 'blue'},
            {nivel: 11, qtdViloes: 4, cor: 'red'},
            {nivel: 12, qtdViloes: 4, cor: 'blue'},
            {nivel: 13, qtdViloes: 1, cor: 'blue'}

        ];
        this.ordaAtual = 0;
        this.cena = cena;
    }

    atualiza(){ // Acessível por ordasManager.atualiza();

        if(this.ordas[this.ordaAtual].qtdViloes > 0){
            this.ordas[this.ordaAtual].qtdViloes--;
        }

        if(this.ordas[this.ordaAtual].qtdViloes === 0 && this.ordaAtual < this.ordas.length ){
            this.ordaAtual++;
            this.cena.criaBads();
            console.log(`pediu pra criar bads e this.ordaAtual = ${this.ordaAtual}`);
        }
    }

    /*nasceNovaOrda(){
        let deveNascerNovaOrda = false;

        let ultimaOrda = 0;
        if(this.ordaAtual > ultimaOrda){
            deveNascerNovaOrda = true;
            ultimaOrda = this.ordaAtual;
        }
        return deveNascerNovaOrda;
    }*/

    get nivelAtual(){ // Acessível por ordasManager.nivelAtual;
        return this.ordas[this.ordaAtual].nivel;
    }

    get qntNesseNivel(){ 
        return this.ordas[this.ordaAtual].qtdViloes ;
    }

    get cor(){
        return this.ordas[this.ordaAtual].cor ;
    }



}