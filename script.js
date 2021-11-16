const displayResult = document.querySelector('#intermediate');
const displayResultf = document.querySelector('#final');
const runningScore = document.querySelector('#running-score');
const playAgain = document.querySelector('#play-again');
let highlightWeapon = document.querySelectorAll('[data-weapon="rock"]');
const allWeaponButtons = document.querySelectorAll('button');
const allWButtonsArray = Array.prototype.slice.call(allWeaponButtons);

function randomWeapon(){
    let weapon = "";
    weaponID = Math.ceil((Math.random()*3));
    if (weaponID == 1){
        weapon = "rock";
        highlightWeapon = document.querySelectorAll('[data-weapon="rock"]');
    } else if (weaponID == 2){    
        weapon = "paper";
        highlightWeapon = document.querySelectorAll('[data-weapon="paper"]');
    } else {
        weapon = "scissors"; 
        highlightWeapon = document.querySelectorAll('[data-weapon="scissors"]'); 
    }
    highlightWeapon[1].setAttribute("id", "highlighted");     
    return weapon;
}

function rules(playerRound, computerRound){
    let roundDraw = 0;
    let roundComputer = 0;
    let roundPlayer = 0;
    if (playerRound == "rock"){
            if (computerRound == "rock") roundDraw = 1;
            if (computerRound == "paper") roundComputer = 1;
            if (computerRound == "scissors") roundPlayer = 1;
        } else if (playerRound == "paper"){
            if (computerRound == "rock") roundPlayer = 1;
            if (computerRound == "paper") roundDraw = 1;
            if (computerRound == "scissors") roundComputer = 1;
        } else if (playerRound == "scissors"){
            if (computerRound == "rock") roundComputer = 1;
            if (computerRound == "paper") roundPlayer = 1;
            if (computerRound == "scissors") roundDraw = 1;
        } 
    return [roundPlayer, roundComputer, roundDraw];    
}

function clickedWeapon(e) {
    const selectedWeapon = e.target.getAttribute('data-weapon'); 
    e.srcElement.setAttribute('id', 'highlighted');
    //console.log(selectedWeapon);
    return selectedWeapon;
    
} 

function play(e){ 
    displayResultf.textContent = ' '; 
    playAgain.textContent = ' ';
    for (let i=0; i<(allWButtonsArray.length); i++){
        if (allWButtonsArray[i].id=='highlighted'){
            allWButtonsArray[i].removeAttribute('id');    
        }
    }
    
    
    const playerRound = clickedWeapon(e);
    const computerRound = randomWeapon();
    const result = rules(playerRound, computerRound);
    let roundPlayer = result[0];
    let roundComputer = result[1];
    let roundDraw = result[2];

    if (roundDraw ==1) displayResult.textContent = "It's a draw";
    if (roundPlayer ==1) displayResult.textContent = "You scored";
    if (roundComputer ==1) displayResult.textContent = "Computer scored";
    
    if (roundPlayer ==1) scorePlayer+= 1;
    if (roundComputer ==1) scoreComputer++ ;
    runningScore.textContent = "You: " + scorePlayer + '\xa0'+"- - -"+'\xa0'+ "Computer:" + scoreComputer;
   
    if (scorePlayer==5) {
        displayResultf.textContent = 'YOU ARE THE WINNER !!!!!';
        playAgain.textContent = 'Click to play again';
        scorePlayer = 0;
        scoreComputer = 0; 
    }    
    if (scoreComputer==5){
        displayResultf.textContent = 'You lost :('; 
        playAgain.textContent = 'Wanna play again? Click on weapon!';
        scorePlayer = 0;
        scoreComputer = 0; 
    } 
}

let scorePlayer = 0;
let scoreComputer = 0;    
const playerWeapons = document.querySelector('.btn-player');
const playerWeapon1 = playerWeapons.querySelector('[data-weapon="rock"]')
const playerWeapon2 = playerWeapons.querySelector('[data-weapon="paper"]')
const playerWeapon3 = playerWeapons.querySelector('[data-weapon="scissors"]')
playerWeapon1.addEventListener('click', play);
playerWeapon2.addEventListener('click', play);
playerWeapon3.addEventListener('click', play);