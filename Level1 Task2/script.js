// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the display element and buttons
    const display = document.getElementById('display');
    const digits = document.querySelectorAll('.digit');
    const operators = document.querySelectorAll('.operator');
    // Variables to store the operands and the current operation
    let currentOperation = null;
    let firstOperand = '';
    let secondOperand = '';
    // Add click event listeners to each digit button
    digits.forEach(digit => {
        digit.addEventListener('click', function () {
            // Depending on whether an operation is selected, update the appropriate operand
            if (currentOperation === null) {
                firstOperand += this.innerText;
                display.value = firstOperand;
            } else {
                secondOperand += this.innerText;
                display.value = secondOperand;
            }
        });
    });
    // Add click event listeners to each operator button
    operators.forEach(operator => {
        operator.addEventListener('click', function () {
            // If an operation is already in progress, calculate the result first
            if (currentOperation !== null) {
                calculate();
            }
            // Set the current operation
            currentOperation = this.innerText;
        });
    });
    // Equals button functionality
    document.getElementById('equals').addEventListener('click', function () {
        calculate();
        // Reset the current operation
        currentOperation = null;
    });
    // Clear button functionality
    document.getElementById('clear').addEventListener('click', function () {
        // Reset all values and clear the display
        firstOperand = '';
        secondOperand = '';
        currentOperation = null;
        display.value = '';
    });
    // Function to perform the calculation
    function calculate() {
        // Convert operand strings to numbers
        firstOperand = parseFloat(firstOperand);
        secondOperand = parseFloat(secondOperand);
        // If operands are not numbers, exit the function
        if (isNaN(firstOperand) || isNaN(secondOperand)) return;
        // Perform the calculation based on the operation
        let result;
        switch (currentOperation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        // Display the result and prepare for the next operation
        display.value = result;
        firstOperand = result;
        secondOperand = '';
    }
});