// Global Variables (Avoid adding lots of them! They bad!)
var randomButton = document.querySelector('#random');
var resetGame = document.querySelector('#reset');
var storedClicks = ["", "", "", "", "", "", "", "", ""];
var stillPlaying = true;
var boardNotFull = true;
var numClicks = 0;
var imageCount = 1;

// Event click handler for reset button
resetGame.addEventListener('click', function()
{
   location.reload();
});

// Starting the game
var startGame = function()
{
   var itIsPlayerOne = Math.round(Math.random()) === 0;
   var gameMaster = document.getElementById('game-master');
   var playerTurn = document.getElementById('player-turn');
   var player1Name = document.getElementById('player1-name').textContent + "!";
   var player2Name = document.getElementById('player2-name').textContent + "!";

   // Set playing order
   setPlayingOrder(itIsPlayerOne, gameMaster, playerTurn, player1Name, player2Name);

   // Taking turns with event listener
   startTurns(itIsPlayerOne, gameMaster, playerTurn, player1Name, player2Name);
}

// Choosing who goes first
var setPlayingOrder = function(itIsPlayerOne, gameMaster, playerTurn, player1Name, player2Name)
{
   gameMaster.textContent = "You're up ";

   if (itIsPlayerOne)
   {
      playerTurn.textContent = player1Name;
   }
   else
   {
      playerTurn.textContent = player2Name;
   }

   return itIsPlayerOne;
}

// Players start taking turns
var startTurns = function(itIsPlayerOne, gameMaster, playerTurn, player1Name, player2Name)
{
   var player1Img = document.getElementById('player1-icon').src;
   var player2Img = document.getElementById('player2-icon').src;
   var gameBoard = document.querySelector('.game-board');

   // Click until winner found
   gameBoard.addEventListener('click', function(event)
   {
      var checkSquare = event.target.id;

      if (storedClicks[checkSquare] === "")
      {
         if (stillPlaying)
         {

            if (itIsPlayerOne)
            {
               changeSquare(player1Img);
            }
            else
            {
               changeSquare(player2Img);
            }

            checkWinner(event, storedClicks, itIsPlayerOne, gameMaster, playerTurn);
            itIsPlayerOne = changePlayerTurn(itIsPlayerOne, playerTurn, player1Name, player2Name);
         }
      }
   });
}

// Image Transition
var imageTransition = function()
{
   var animateImg = document.getElementById("image" + imageCount);
   animateImg.classList.add('move-up');
   imageCount += 1;
}

// Changing square for each player
var changeSquare = function(playerImg)
{
   var insertImg = document.createElement("img");
   var imgSrc = document.createAttribute("src");
   imgSrc.value = playerImg;
   insertImg.className = "player-img";
   insertImg.id = "image" + imageCount;
   event.target.appendChild(insertImg);
   insertImg.setAttributeNode(imgSrc);
   numClicks += 1;

   setTimeout(imageTransition, 50);
}

// Changing player name
var changeName = function(playerTurn, playerName)
{
   playerTurn.textContent = playerName;
   return playerTurn;
}

// Changing turns
var changePlayerTurn = function(itIsPlayerOne, playerTurn, player1Name, player2Name)
{
   itIsPlayerOne = !itIsPlayerOne;

   if (stillPlaying)
   {
      if (itIsPlayerOne)
      {
         changeName(playerTurn, player1Name);
      }
      else
      {
         changeName(playerTurn, player2Name);
      }
   }

   return itIsPlayerOne;
}

// Check Winner
// Refactor winning conditions...lol
var checkWinner = function(event, storedClicks, itIsPlayerOne, gameMaster, playerTurn)
{
   var checkSquare = event.target.id;
   storedClicks[checkSquare] = itIsPlayerOne ? true : false;

   // Winning Conditions for rows for player 1
   if ((storedClicks[0] === true && storedClicks[1] === true && storedClicks[2] === true) || (storedClicks[3] === true && storedClicks[4] === true && storedClicks[5] === true) || (storedClicks[6] === true && storedClicks[7] === true && storedClicks[8] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // Winning conditions for columns for player 1
   else if ((storedClicks[0] === true && storedClicks[3] === true && storedClicks[6] === true) || (storedClicks[1] === true && storedClicks[4] === true && storedClicks[7] === true) || (storedClicks[2] === true && storedClicks[5] === true && storedClicks[8] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // Winning conditions for diagonals for player 1
   else if ((storedClicks[0] === true && storedClicks[4] === true && storedClicks[8] === true) || (storedClicks[2] === true && storedClicks[4] === true && storedClicks[6] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // Winning Conditions for rows for player 2
   else if ((storedClicks[0] === false && storedClicks[1] === false && storedClicks[2] === false) || (storedClicks[3] === false && storedClicks[4] === false && storedClicks[5] === false) || (storedClicks[6] === false && storedClicks[7] === false && storedClicks[8] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // Winning conditions for columns for player 2
   else if ((storedClicks[0] === false && storedClicks[3] === false && storedClicks[6] === false) || (storedClicks[1] === false && storedClicks[4] === false && storedClicks[7] === false) || (storedClicks[2] === false && storedClicks[5] === false && storedClicks[8] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // Winning conditions for diagonals for player 2
   else if ((storedClicks[0] === false && storedClicks[4] === false && storedClicks[8] === false) || (storedClicks[2] === false && storedClicks[4] === false && storedClicks[6] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, gameMaster);
   }
   // If no winning condition met, game ends in draw
   else if (numClicks === 9)
   {
      stillPlaying = false;
      boardNotFull = false;
      finishGame(itIsPlayerOne, gameMaster, playerTurn);
   }
}

// Finish game
var finishGame = function(itIsPlayerOne, gameMaster, playerTurn)
{
   if (boardNotFull === false)
   {
      gameMaster.textContent = "It's a hecking draw!";
      playerTurn.textContent = "";
   }
   else if (itIsPlayerOne)
   {
      gameMaster.textContent = "Winner is ";
   }
   else
   {
      gameMaster.textContent = "Winner is ";
   }
}

// Start game on screen load
startGame();
