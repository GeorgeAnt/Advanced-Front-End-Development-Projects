$(document).ready(function() {
  var human = "X";
  var ai = "O";
  var gameIsOn = true;
  var board=[0,1,2,3,4,5,6,7,8];
  const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; 
  function checkForWinners(board, player) {
    let positions = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);  
    for (let i = 0; i < winArray.length; i++) {
      if (winArray[i].every(x => positions.indexOf(x) > -1)) {
        return true;      
      }
    }
    return false;
  }
  //If board has no more empty spots(no more numbers) it is a tie.
  function checkForTie(board){ 
    return board.reduce((a, e, i) =>
		(typeof e == 'number') ? a.concat(i) : a, []).length === 0;    
  }
  //Initialise the game.
  function newGame() {
    for (let i = 0; i < 9; i++) {
      $("#" + i).html("");
    }
    board = [0,1,2,3,4,5,6,7,8];
    $("#O").fadeIn();
    $("#X").fadeIn();
    gameIsOn = true;
    $(".anouncement").html("TIC TAC TOE");       
  }
  
  $(".new").on("click", function() {
    newGame();
  });
    
  $("#X").on("click", function() {   
    human = "X";
    ai = "O";
    $("#O").fadeOut();
    $("#X").fadeOut();        
  });
    
  $("#O").on("click", function() {  
    human = "O";
    ai = "X";
    $("#X").fadeOut();
    $("#O").fadeOut();
  });
   
  function bestSpot() {
	return minMax(board, ai).index;
}
  //The min max algorithm is taken by Beau Carnes github https://github.com/beaucarnes/fcc-project-tutorials/blob/master/tictactoe/7/script.js
  //after fully understanding the way it works made some minor tweeks to implement it to my project.
  function minMax(newBoard,player){
      
    var availspots=newBoard.filter(s => typeof s == 'number');
           
    if (checkForWinners(newBoard, human)) {
		return {score: -10};
	} else if (checkForWinners(newBoard, ai)) {
		return {score: 10};
	} else if (availspots.length === 0) {
		return {score: 0};
	}
    
	var moves = [];
	for (var i = 0; i < availspots.length; i++) {
		var move = {};
		move.index = newBoard[availspots[i]];
		newBoard[availspots[i]] = player;

		if (player == ai) {
			var result = minMax(newBoard, human);
			move.score = result.score;
		} else {
			var result = minMax(newBoard, ai);
			move.score = result.score;
		}
		newBoard[availspots[i]] = move.index;
		moves.push(move);
	}

	var bestMove;
	if(player === ai) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
    
  }
    //The main on click function.
   $(".box").on("click",function() {
    //Usage of positions to avoid overlapping clicks. 
    let positions = board.reduce((a, e, i) =>
		(typeof e == 'number') ? a.concat(i) : a, []);
     //Getting the ID of the box we click converted into an integer. 
    let square = parseInt($(this).attr("id"));
     
    //If the square is free and game is not over 
    if(positions.includes(square) && gameIsOn){
    //Write human symbol and register it at the array board. 
    $(this).html(human);
    board[square]=human;
      //check for win/tie
    if (checkForWinners(board, human)) {
      $(".anouncement").html("YOU WON");
       gameIsOn = false;
     }else if(checkForTie(board)){          
             $(".anouncement").html("ITS A TIE");  
     }else{
       //If it is not win or tie move AI to the best spot computed by min max.
       $("#"+bestSpot()).html(ai);  
       board[bestSpot()]=ai;
       if(checkForWinners(board,ai)){
         $(".anouncement").html("YOU LOSE");
         gameIsOn = false;
       };
     }
    }
  });
  

  
});