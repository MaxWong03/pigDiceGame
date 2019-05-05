/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Your 3 Challenges
Change the game to follow these rules:

1) A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2) Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out:)

3) Add another dice to the game, so that there are two dices now. The player losses his cucrent score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one)


*/

var activePlayer, roundScore, globalScore, hasWinner, Winner,WinningScore;


//Initializing the game
function gameInit(){
    //setting activePlayer to player 1, and setting the roundScore and globalScore to 0, no winners
    activePlayer = 0; 
    roundScore = 0;
    globalScore = [0,0];
    hasWinner = false;
    //remove any potential winner class and active class (for player 2 only since default active player is 1)
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    //changing the text content to match the beginning of the game state
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    
    //hiding the dice at the beginning
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    

}

function rollDice(){
        var dice;
        dice = Math.floor(Math.random() *6) + 1; //rolling the dice
        return dice;
}

function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    return activePlayer;
}

function checkWinner(){
    if (globalScore[0] >= WinningScore){ //Player 1 wins
        hasWinner = true;
        Winner = 0; 
    }else if (globalScore[1] >= WinningScore){//Player 2 wins
        hasWinner = true;
        Winner = 1;
    }else{//no one has won yet
         return hasWinner;
    }
     return hasWinner;
}

function gameEnds(){
    //removing active class from both player
     document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-1-panel').classList.remove('active');
    //hiding the dice
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice2').style.display = 'none';
    if(Winner == 0){
        document.querySelector('.player-0-panel').classList.add('winner');
        document.querySelector('#name-0').textContent = 'Winner!';
    }else{
        document.querySelector('.player-1-panel').classList.add('winner');
        document.querySelector('#name-1').textContent = 'Winner!';
    }
     
       
        
}

gameInit();

//Handling Dice Rolling Event

document.querySelector('.btn-roll').addEventListener('click', function(){
    var diceDom1 = document.querySelector('.dice'); //declaring DOM element for dice1
    var diceDom2 = document.querySelector('.dice2') //declaring DOM element for dice2
    if(checkWinner() == false){ //only let them roll dice when there is no winner, ie the game is still on
         diceDom1.style.display = 'block'; //show the dice
         diceDom2.style.display = 'block';
        var diceValue = [];
        diceValue[0] = rollDice();
        diceValue[1] = rollDice();
    if (diceValue[0] == 6 && diceValue[1] == 6){ //if both dices are 6 you lose the entire score + swtich player
        diceDom1.src = 'dice-' + diceValue[0] + '.png'; //changing the image source of the dice
        diceDom2.src = 'dice-' + diceValue[1] + '.png';
        //setting roundScore and globalScore to 0 
        roundScore = 0;
        globalScore[activePlayer] = 0;
        //updating HTML text content 
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];
        activePlayer = switchPlayer();
    }else if (diceValue[0] == 1 || diceValue[1] == 1){//set the roundScore to 0 and switch active player if 1 of the dice is 1
        diceDom1.src = 'dice-' + diceValue[0] + '.png'; //changing the image source of the dice
        diceDom2.src = 'dice-' + diceValue[1] + '.png';
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
         //switch active Player
        activePlayer = switchPlayer();
    }else{
        roundScore = roundScore + diceValue[0] + diceValue[1];
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //updating dice image
        diceDom1.src = 'dice-' + diceValue[0] + '.png'; //changing the image source of the dice
        diceDom2.src = 'dice-' + diceValue[1] + '.png';     
    }
        
    
    }
    
    
});

                                                                  
//Handling Score Holding Event, only when there is no winner

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(checkWinner() == false){ //only let them update the score when there is no winner, ie the game is still on
    globalScore[activePlayer] += roundScore; //updating global score
    document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];
    roundScore = 0; //resetting the roundscoure before potential switching of player
    var input = document.querySelector('.final-score').value;
    //undefined, 0, null, "" are == false for javascript
    //anything else are == true for javascript
        
    if(input){ //if there is an input, the WinningScore = userinput
        WinningScore = input;
    }else{ //go back to the default WinningScore of 100
        WinningScore = 100;
    }
      if(checkWinner() == true){ //if after we updated the score there is a winner, we end the game, other else we switch player 
        gameEnds();
    }else{
        activePlayer = switchPlayer(); //switch player
    }
        
    }
    
  
    
    
});

//Handling New game button
document.querySelector('.btn-new').addEventListener('click', function(){
    gameInit();
})