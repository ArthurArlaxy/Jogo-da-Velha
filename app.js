const buttons = document.querySelectorAll('.btn-game')
const sectionGame = document.getElementById('game')
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')
const buttonStart = document.getElementById('start')
const h2 = document.querySelector('h2')
const resetBtn = document.getElementById('reset')
let count = 0

buttonStart.addEventListener('click', round)

buttons.forEach(button => {
    button.disabled = true;
});

function getWinPossibilities(classe){
    let possibility = document.getElementsByClassName(classe)
    win = []
    Array.from(possibility).forEach(value => {
        win.push(value.innerText);
    });

        if (win[0] === win[1] && win[1] === win[2] && win[0] !== ''){
            if (win[0] === 'X'){
                h2.innerText = `O vencedor é ${player1.value}` 
            } else {
                h2.innerText = `O vencedor é ${player2.value}` 
            }

            Array.from(possibility).forEach(button => {
                button.style.color = "#464646"
                button.style.backgroundColor = "#FFF"
            })

            buttons.forEach(button => {
                button.disabled = true;
            });
        }
}

function velha(){
    const isBoardFull = [...buttons].every(button => button.innerText === 'X' || button.innerText === 'O');
    if (isBoardFull){
        h2.innerText = "O jogo deu Velha"
    }
}

function match(){
    velha('btn-game')
    getWinPossibilities('row1')
    getWinPossibilities('row2')
    getWinPossibilities('row3')
    getWinPossibilities('col1')
    getWinPossibilities('col2')
    getWinPossibilities('col3')
    getWinPossibilities('dig1')
    getWinPossibilities('dig2')
}

function round(){

    if (!player1.value || !player2.value) {
        alert("Por favor, insira os nomes dos jogadores!");
        return;
    }

    if (count % 2 === 0){
        h2.innerText = `Vez de ${player1.value}`
    } else {
        h2.innerText = `Vez de ${player2.value}`
    }
    if (count === 0){
        buttons.forEach(button => {
            button.disabled = false;
            buttonStart.disabled = true
        });
    }
}

buttons.forEach(function(button) {
    button.addEventListener('click', function() {

        if(button.innerText === "X" || button.innerText === "O"){
            
            return alert('Esse espaço ja foi selecionado!')
        }

        if (count % 2 == 0){
            button.innerText = 'X';
        }  else{
            button.innerText = 'O'
        }
        count++

        round()
        match()
    });
});

resetBtn.addEventListener('click', function (){
    buttons.forEach(button =>{
        button.innerText = ""
        button.style.color = ""
        button.style.backgroundColor = ""
    })
    h2.innerText = ""
    buttonStart.disabled = false
    count = 0
})