const apiURL = 'https://web-production-83a7.up.railway.app/ranking'

function hora(){
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    const milissegundos = agora.getMilliseconds();

    console.log(`Hora atual: ${horas}:${minutos}:${segundos}:${milissegundos}`);
}

export async function enviarPartida(dados){ 
    //hora();

    fetch(apiURL,{  
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados),

    })
    .then(response => response.json())
    .then(data => {
        console.log(`Resposta do servidor: ${data}`);
        //return new Promise;
    })
    .catch(error => {
        console.error(`Erro ao enviar os dados: ${error}`);
        alert('Sua pontuação não foi salva por erro ao comunicar com o servidor :/');
    });

    //hora();
}

export async function receberRanking(){
    fetch(apiURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        clearLastRanking();
        data.forEach(entrada => {
            const nome = entrada.nome;
            const pontuacao = entrada.pontuacao;
            const id = entrada.id;
            const horario = entrada.horario;
            AddPlayerNoRanking(nome, pontuacao, id);
        })
    })
    .catch(error =>{
        console.error(`Erro ao buscar o ranking: ${error}`);
    })
}

function AddPlayerNoRanking(nome, score, id){ // O id não esta sendo mostrado pq é feio só mostra pra debugar
    const rankingBody = document.getElementById('ranking-body');

    const row = document.createElement('tr'); document.createElement

    const nameCell = document.createElement('td');
    nameCell.textContent = nome;

    const scoreCell = document.createElement('td');
    scoreCell.textContent = score;

    /*const idCell = document.createElement('td');
    idCell.textContent = id;*/

    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    //row.appendChild(idCell);

    rankingBody.appendChild(row);
}

export async function servidor(nome, pontuacao){
    await enviarPartida({nome, pontuacao});
    receberRanking();
}

function clearLastRanking(){
    const rankingBody = document.getElementById('ranking-body');

    while(rankingBody.firstChild){
        rankingBody.removeChild(rankingBody.firstChild);
    }
}