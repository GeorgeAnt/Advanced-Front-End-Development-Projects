$(document).ready(function() {
  var inputArr = ["0"];
  var isResult = false;
  const dotRegex = /^\d+(\.\d+|\.)?([+\-*\/]\d+(\.|\.\d+)?)*$/;
  const divZero = /([0]|[1-9])+\/+0(?![1-9]\d*$)/;
  const operators = ["+", "-", "*", "/"];
  const operatorsPlus = ["+", "-", "*", "/", "."];
  
  function update() {
    //Updating the history
    let historyString = inputArr.join("");
    $("#history").html(historyString);
  }

   function getTotal() {
     //Checking for division with zero
    let inputString = inputArr.join("");
    if(inputString.match(divZero) ){
      $("#answer").html("NaN");
      inputArr = ["0"];
      update(); 
    }else{
       //Getting the result.
       let result = eval(inputString);       
       $("#answer").html(result);
      //Converting it back to String.
    inputArr = [result.toString()];
    update();
    } 
  }

  function getValue(value) {
    //Replace the initial 0 with the input(0-9 - +).
    if (
      inputArr[0] === "0" &&
      inputArr.length == 1 &&
      value !== "*" &&
      value !== "/" &&
      value !== "."
    ) {
      inputArr[0] = value;
      //If last action was get result, and we follow it by a new number.
    } else if (isResult && value.match(/^\d*$/)) {
      inputArr[0] = value;
      //If last action was get result, and we follow it by a dot.
    } else if (isResult && value === ".") {
      inputArr[0] = "0";
      inputArr[1] = value;
    } else {
      inputArr.push(value);
    }
    isResult = false;
    if (value === ".") {
      //Avoid wrong inputs on decimals.
      if (!inputArr.join("").match(dotRegex)) {
        console.log("duplicate dot");
        inputArr.pop();
        update();
      } else {
        update();
      }
      //When input is an operator and the previous was an operator or a dot.
      
    } else if (
      $.inArray(value, operators) !== -1 &&
      $.inArray(inputArr[inputArr.length - 2], operatorsPlus) !== -1
    ) {
      console.log("duplicate operator");
      inputArr.pop();
      update();
    } else {
      update();
    }
  }

  $("button").on("click", function() {
    if (this.id === "ac") {
      inputArr = ["0"];
      update();
      getTotal();
    } else if (this.id === "ce") {
      //Remove the last input.If we are on our last number,reset all.
      if (inputArr.length > 1) {
        inputArr.pop();
        update();
      } else {
        historyString = "0";
        inputArr = ["0"];  
        update();
        getTotal();
      }
    } else if (this.id === "equals") {
      //Remove operators from the end of the array. eg 32+14-
      if ($.inArray(inputArr[inputArr.length - 1], operators) !== -1) {
        inputArr.pop();
      }
      isResult = true;
      update();
      getTotal();
    } else {
      getValue(this.id);
    }
  });
});