export function enviarPartida(dados){

    fetch('http://localhost:3000/api/ranking',{  
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados),

    })
    .then(response => response.json())
    .then(data => {
        console.log(`Resposta do servidor: ${data}`);
    })
    .catch(error => {
        console.error(`Erro ao enviar os dados: ${error}`);
        alert('Sua pontuação não foi salva por erro ao comunicar com o servidor :/');
    });
}

export function receberRanking(){
    fetch('http://localhost:3000/api/ranking')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.forEach(entrada => {
            const nome = entrada.nome;
            const pontuacao = entrada.pontuacao;
            AddPlayerNoRanking(nome, pontuacao);
        })
    })
    .catch(error =>{
        console.error(`Erro ao buscar o ranking: ${error}`);
    })
}

function AddPlayerNoRanking(nome, score){

    const rankingBody = document.getElementById('ranking-body');

    const row = document.createElement('tr'); document.createElement

    const nameCell = document.createElement('td');
    nameCell.textContent = nome;

    const scoreCell = document.createElement('td');
    scoreCell.textContent = score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    rankingBody.appendChild(row);
}

export async function servidor(nome, pontuacao){
    await enviarPartida({nome, pontuacao});
    receberRanking();
}