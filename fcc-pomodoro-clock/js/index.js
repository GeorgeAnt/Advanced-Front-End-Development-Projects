// Author : George Antoniadis
$(document).ready(function() {
  var sesLength = parseInt($("#sessionText").html());
  var brLength = parseInt($("#breakText").html());
  $("#mins").html(sesLength);
  var isPaused = true;
  var on = true;
  var timer = sesLength * 60;
  var counter;
  var br = false;
  var alarm = $("#end")[0];

  $("#plusSession").on("click", function() {
    if (sesLength < 60 && isPaused) {
      $("#sessionText").html((sesLength += 1));
      $("#mins").html(sesLength);
      timer = sesLength * 60;
    }
  });
  $("#minusSession").on("click", function() {
    if (sesLength > 5 && isPaused) {
      $("#sessionText").html((sesLength -= 1));
      $("#mins").html(sesLength);
      timer = sesLength * 60;
    }
  });
  $("#plusBreak").on("click", function() {
    if (brLength < sesLength && isPaused) {
      $("#breakText").html((brLength += 1));
    }
  });
  $("#minusBreak").on("click", function() {
    if (brLength > 1 && isPaused) {
      $("#breakText").html((brLength -= 1));
    }
  });

  $("#reset").on("click", function() {
    $("#mins , #secs").html("00");
  });

  $("#start").on("click", function(event) {
    if (on) {
      counter = setInterval(function intCounter() {
        if (!isPaused) {
          timer -= 1;
        }
        if (timer === 0) {
          if (!br) {
            timer = brLength * 60;
            br = true;
            alarm.play();
          } else {
            br = false;
            clearInterval(counter);
            timer = sesLength * 60;
            alarm.play();
          }
        }
        $("#mins").html(Math.floor(timer / 60));
        $("#secs").html(timer % 60);
      }, 1000);
    }
    event.preventDefault();
    on = false;
    isPaused = false;
  });

  $("#stop").on("click", function(event) {
    event.preventDefault();
    isPaused = true;
    on = false;
  });

  $("#reset").on("click", function(event) {
    event.preventDefault();
    timer = sesLength * 60;
    isPaused = true;
  });
});