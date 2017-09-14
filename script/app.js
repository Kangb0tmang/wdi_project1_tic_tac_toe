// Global Variables (Avoid adding lots of them! They bad!)
var randomButton = document.querySelector('#random');
var resetGame = document.querySelector('#reset');
var storedClicks = ["", "", "", "", "", "", "", "", ""];
var stillPlaying = true;
var boardNotFull = true;
var numClicks = 0;

// Click event for choosing who goes first
randomButton.addEventListener('click', function()
{
   var itIsPlayerOne = Math.round(Math.random()) === 0;
   randomButton.disabled = true;
   startGame(itIsPlayerOne);
});

// Starting the game
var startGame = function(itIsPlayerOne)
{
   // Build after basic function done
   // buildGameBoard();
   // Set playing order
   setPlayingOrder(itIsPlayerOne);

   // Taking turns with event listener
   startTurns(itIsPlayerOne);
}

// Event click handler for reset button
resetGame.addEventListener('click', function()
{
   location.reload();
});

// Choosing who goes first
var setPlayingOrder = function(itIsPlayerOne)
{
   if (itIsPlayerOne)
   {
      console.log('Player 1 (Doggo) goes first');
      // Set as player 1 goes first
   }
   else
   {
      console.log('Player 2 (Kitteh) goes first');
      // Set as player 2 goes first
   }

   return itIsPlayerOne;
}

// Players start taking turns
var startTurns = function(itIsPlayerOne)
{
   var player1 = "./images/doggo.jpg";
   var player2 = "./images/kitteh.jpeg";
   var gameBoard = document.querySelector('.game-board');

   // Click until winner found
   // Change the game loop logic, a bit messy here
   gameBoard.addEventListener('click', function(event)
   {
      var checkSquare = event.target.id;

      if (storedClicks[checkSquare] === "")
      {
         if (stillPlaying)
         {
            if (itIsPlayerOne)
            {
               changeSquare(player1);
            }
            else
            {
               changeSquare(player2);
            }

            checkWinner(event, storedClicks, itIsPlayerOne);
            itIsPlayerOne = changePlayerTurn(itIsPlayerOne);
         }
      }
   });
}

// Changing square for each player
var changeSquare = function(player)
{
   var insertImg = document.createElement("img");
   var imgSrc = document.createAttribute("src");
   imgSrc.value = player;
   event.target.appendChild(insertImg);
   insertImg.setAttributeNode(imgSrc);
   numClicks += 1;
}

// Changing turns
var changePlayerTurn = function(itIsPlayerOne)
{
   itIsPlayerOne = !itIsPlayerOne;
   return itIsPlayerOne;
}

// Check Winner
// Refactor winning conditions...lol
var checkWinner = function(event, storedClicks, itIsPlayerOne, player1, player2)
{
   var checkSquare = event.target.id;
   storedClicks[checkSquare] = itIsPlayerOne ? true : false;

   // Winning Conditions for rows for player 1
   if ((storedClicks[0] === true && storedClicks[1] === true && storedClicks[2] === true) || (storedClicks[3] === true && storedClicks[4] === true && storedClicks[5] === true) || (storedClicks[6] === true && storedClicks[7] === true && storedClicks[8] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // Winning conditions for columns for player 1
   else if ((storedClicks[0] === true && storedClicks[3] === true && storedClicks[6] === true) || (storedClicks[1] === true && storedClicks[4] === true && storedClicks[7] === true) || (storedClicks[2] === true && storedClicks[5] === true && storedClicks[8] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // Winning conditions for diagonals for player 1
   else if ((storedClicks[0] === true && storedClicks[4] === true && storedClicks[8] === true) || (storedClicks[2] === true && storedClicks[4] === true && storedClicks[6] === true))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // Winning Conditions for rows for player 2
   else if ((storedClicks[0] === false && storedClicks[1] === false && storedClicks[2] === false) || (storedClicks[3] === false && storedClicks[4] === false && storedClicks[5] === false) || (storedClicks[6] === false && storedClicks[7] === false && storedClicks[8] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // Winning conditions for columns for player 2
   else if ((storedClicks[0] === false && storedClicks[3] === false && storedClicks[6] === false) || (storedClicks[1] === false && storedClicks[4] === false && storedClicks[7] === false) || (storedClicks[2] === false && storedClicks[5] === false && storedClicks[8] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // Winning conditions for diagonals for player 2
   else if ((storedClicks[0] === false && storedClicks[4] === false && storedClicks[8] === false) || (storedClicks[2] === false && storedClicks[4] === false && storedClicks[6] === false))
   {
      stillPlaying = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
   // If no winning condition met, game ends in draw
   else if (numClicks === 9)
   {
      stillPlaying = false;
      boardNotFull = false;
      finishGame(itIsPlayerOne, player1, player2);
   }
}

// Finish game
// Don't log the winner if its a draw
var finishGame = function(itIsPlayerOne, player1, player2)
{
   if (boardNotFull === false)
   {
      console.log('Game ends in a draw');
   }
   else if (itIsPlayerOne)
   {
      console.log("Doggo wins");
   }
   else
   {
      console.log("Kitteh wins");
   }
}
