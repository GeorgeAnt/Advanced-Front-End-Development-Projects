$(document).ready(function() {
  var moves = [];
  var turns =1;
  var index;
  var input =[];
  var on = 1000;
  var off = 500;
  var x;
  var ready = false;
  var strict = false;
  var deviceActive=false;
  
  
   $("#start").on("click",function() { 
    if(deviceActive){
      newGame();
      init();
    }      
   });
  
  $("#strict").on("click",function() { 
    if(deviceActive){
    strict= !strict;
    strict ? $("#strict").addClass("btn-danger") : $("#strict").removeClass("btn-danger");
      }
  });
  
   function newGame(){
    $("#announcement").html("");
    $("#turns").html(turns);
    createMoves();
    index=0;
    input=[];
   }
   function createMoves(){ 
     moves = [];
     for(let i=0 ; i < 20 ; i++){
     moves.push(Math.floor((Math.random() * 4)));
     }
   }
  
  
   function init(){
     ready = false;
     x = setInterval(function(){ 
      
       
       if(moves[index]===0){
         $("#0").addClass("green-lit");
         $("#audio-green")[0].play();
         setTimeout(function () {
                        $("#0").removeClass("green-lit");
                    }, off);
         
       }else if(moves[index]===1){
         $("#1").addClass("red-lit");
         $("#audio-red")[0].play();
         setTimeout(function () {
                        $("#1").removeClass("red-lit");
                    }, off);
         
       }else if(moves[index]===2){
         $("#2").addClass("yellow-lit");
         $("#audio-yellow")[0].play();
         setTimeout(function () {
                        $("#2").removeClass("yellow-lit");
                    }, off);
       }else if(moves[index]===3){
         $("#3").addClass("blue-lit");
         $("#audio-blue")[0].play();
         setTimeout(function () {
                        $("#3").removeClass("blue-lit");
                    }, off);
     }      
        index++;
        if (index>=turns) {
          clearInterval(x);
          ready = true;
        }
            }, on);
     
   }  
      
  function winConditions(num){
    let success = false;         
          if(moves.join("").slice(0,input.length)!==input.join("")){
            strict ? turns = 1 : turns = turns ;
            $("#error")[0].play();
            clearInterval(x);
            success = false;
            newGame();
            init();                         
          }else if(input.length==moves.length){          
            $("#announcement").html("YOU WON...Once !REPEAT!")
            setTimeout(function () {
            clearInterval(x);
            success = false;
            ready = false;
            turns=1;
            newGame();
            init();  
      }, 3000);
                           
          }else{
            success = true;
          }
          if(input.length==turns && success){
          turns ++ ;
          $("#turns").html(turns);
          newGame();
          init();
          
          }            
      }    
  
  
    $("#0").on("click",function() {
      if(ready){
      input.push(0); 
      $("#0").addClass("green-lit");
      $("#audio-green")[0].play();
      setTimeout(function () {
      $("#0").removeClass("green-lit");
      }, 200);
      winConditions(input.length);
        }
    });
    $("#1").on("click",function() {  
      if(ready){
      input.push(1); 
      $("#1").addClass("red-lit");
      $("#audio-red")[0].play();
      setTimeout(function () {
      $("#1").removeClass("red-lit");
      }, 200);
      winConditions(input.length);
      }
    });
    $("#2").on("click",function() {   
      if(ready){
      input.push(2);
      $("#2").addClass("yellow-lit");
      $("#audio-yellow")[0].play();
      setTimeout(function () {
      $("#2").removeClass("yellow-lit");
      }, 200);
      winConditions(input.length);
      }
    });
    $("#3").on("click",function() {    
      if(ready){
      input.push(3);
      $("#3").addClass("blue-lit");
      $("#audio-blue")[0].play();
      setTimeout(function () {
      $("#3").removeClass("blue-lit");
      }, 200);
      winConditions(input.length);
      }
    });
     
     $("#off").on("click",function() {
       deviceActive=false;
       clearInterval(x);
       $("#turns").html("--");
        $("#off").addClass("disabled").removeClass("active");
       $("#on").removeClass("disabled").addClass("active");
     
     });
    $("#on").on("click",function() {
       turns=1;
        deviceActive=true;
       $("#turns").html("00");
       $("#off").addClass("active").removeClass("disabled");
       $("#on").removeClass("active").addClass("disabled");
     
     });
   
   
});