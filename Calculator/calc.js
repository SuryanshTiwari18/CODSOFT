const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentValue = "";
let currentOperator = "";
let previousValue = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.getAttribute("data-action");
        const value = button.getAttribute("data-value");

        if(action){
            if(action === "clear"){
                clearDisplay();
            } 
            else if(action === "delete"){
                deleteLast();
            }
            else if(action === "calculate"){
                calculateResult();
            }
        }
        else if(value){
            addValue(value);
        }
    });
});

function clearDisplay (){
    display.value = "";
    currentValue = "";
    currentOperator = "";
    previousValue = "";
}

function deleteLast() { 
    if (currentValue.length > 0) { 
        currentValue = currentValue.slice(0, -1); 
        display.value = display.value.slice(0, -1); 
    } 
    else if (currentOperator) { 
        currentOperator = ""; 
        display.value = display.value.slice(0, -1); 
        currentValue = previousValue; 
        previousValue = ""; 
    }
}

function addValue (value) {
    if(["+", "-", "*", "/"].includes(value)){
        if(currentValue === "") return;
        if(currentOperator) calculateResult();
        currentOperator = value;
        previousValue = currentValue;
        currentValue = "";
    }
    else{
        currentValue += value;
    }
    display.value += value;
}

function calculateResult (){
    if(!currentOperator || !previousValue) return;
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);
    let result;
    if(currentOperator === "+"){
        result = num1 + num2;
    }
    else if(currentOperator === "-"){
        result = num1 - num2;
    }
    else if(currentOperator === "/"){
        result = num1 / num2;
    }
    else if(currentOperator === "*"){
        result = num1*num2;
    }
    display.value = result;
    currentValue = result.toString();
    currentOperator = "";
    previousValue = "";
}