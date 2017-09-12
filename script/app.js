console.log('Tic tac Toe');
// Comparing data with winning set of data (win conditions)
// Think about what you're gonna do with the data
var randomButton = document.querySelector('#random');
var resetGame = document.querySelector('#reset');
var stillPlaying = true;

randomButton.addEventListener('click', function()
{
   var randomiser = (Math.floor(Math.random() * 2) === 0);
   randomButton.disabled = true;
   startGame(randomiser);
});

var startGame = function(playerOrder)
{
   // Build after basic function done
   // buildGameBoard();

   // Set Playing Order
   setPlayingOrder(playerOrder);

   playerTurn(playerOrder);

   // while(stillPlaying)
   // {
   //
   //    playerTurn();
   //
   //    // Put Image in div container, img width 100%
   //    changeSquare();
   //
   //
   //    changePlayerTurn();
   // }
   //
   // // show winner
   // finishGame();
}

// Starts the Game

// Event click handler for reset button
resetGame.addEventListener('click', function()
{
   location.reload();
});

var setPlayingOrder = function(player)
{
   if (player)
   {
      console.log('Player 1 goes first');
      // Set as player 1 goes first
   }
   else
   {
      console.log('Player 2 goes first');
      // Set as player 2 goes first
   }

   return player
}

var playerTurn = function(player)
{
   var player1 = "./images/doggo.jpg";
   var player2 = "./images/kitteh.jpeg";
   var gameBoard = document.querySelector('.game-board');

   gameBoard.addEventListener('click', function()
   {
      console.log(event.target);

      if (player)
      {
         var insertImg = document.createElement("img");
         var imgSrc = document.createAttribute("src");
         imgSrc.value = player1;
         event.target.appendChild(insertImg);
         insertImg.setAttributeNode(imgSrc);
      }
      else if (!player)
      {
         var insertImg = document.createElement("img");
         var imgSrc = document.createAttribute("src");
         imgSrc.value = player2;
         event.target.appendChild(insertImg);
         insertImg.setAttributeNode(imgSrc);
      }
   });
}
