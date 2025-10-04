document.addEventListener("DOMContentLoaded", () => {
    const historyDisplay = document.querySelector(".history");
    const currentOperandDisplay = document.querySelector(".current-operand");
    const buttons = document.querySelector(".buttons");

    let currentOperand = "0";
    let previousOperand = "";
    let operation = undefined;
    let history = "";

    function updateDisplay() {
        currentOperandDisplay.textContent = currentOperand;
        historyDisplay.textContent = history;
    }

    function appendNumber(number) {
        if (number === "." && currentOperand.includes(".")) return;
        if (currentOperand === "0" && number !== ".") {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        history += number;
    }

    function chooseOperation(selectedOperation) {
        if (currentOperand === "") return;
        if (previousOperand !== "") {
            calculate();
        }
        operation = selectedOperation;
        previousOperand = currentOperand;
        currentOperand = "";
        history += ` ${operation} `;
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = "";
        history = currentOperand;
    }

    function clear() {
        currentOperand = "0";
        previousOperand = "";
        operation = undefined;
        history = "";
    }

    function backspace() {
        currentOperand = currentOperand.slice(0, -1);
        if (currentOperand === "") {
            currentOperand = "0";
        }
        history = history.slice(0, -1);
    }

    function negate() {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        history = currentOperand;
    }

    buttons.addEventListener("click", e => {
        const target = e.target;
        if (target.classList.contains("number")) {
            appendNumber(target.textContent);
            updateDisplay();
        } else if (target.classList.contains("operator")) {
            chooseOperation(target.dataset.operator);
            updateDisplay();
        } else if (target.classList.contains("function")) {
            const command = target.dataset.command;
            if (command === "clear") {
                clear();
            } else if (command === "backspace") {
                backspace();
            } else if (command === "negate") {
                negate();
            }
            updateDisplay();
        } else if (target.classList.contains("equals")) {
            calculate();
            updateDisplay();
        }
    });

    updateDisplay();
});
