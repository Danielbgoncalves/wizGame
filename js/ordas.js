export default class ordasManager {
    constructor(cena){
        this.ordas = [
            {nivel: 1, qtdViloes: 1, cor: 'red'},
            {nivel: 2, qtdViloes: 2, cor: 'blue'},
            {nivel: 3, qtdViloes: 2, cor: 'red'},
            {nivel: 4, qtdViloes: 2, cor: 'red'},
            {nivel: 5, qtdViloes: 2, cor: 'blue'},
            {nivel: 6, qtdViloes: 2, cor: 'red'},
            {nivel: 7, qtdViloes: 2, cor: 'blue'},
            {nivel: 8, qtdViloes: 2, cor: 'red'},
            {nivel: 9, qtdViloes: 2, cor: 'red'},
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