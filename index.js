const newExpense = document.querySelector('#createExpense');
const expenseListElement = document.querySelector(".expenses-list");

function printExpense(expense) {


    const expenseItem = document.createElement("article");

    let expenseElement = `
    <p>Importe: ${expense.amount}, Concepto: ${expense.concept}</p>
  `

    expenseItem.innerHTML = expenseElement;

    expenseListElement.prepend(expenseItem);

}

newExpense.addEventListener("click", (event) => {
    event.preventDefault();

    const inputAmount = document.querySelector('#amount');
    localStorage.setItem("savedAmount", inputAmount.value);

    const inputConcept = document.querySelector('#concept');
    localStorage.setItem("savedConcept", inputConcept.value);

    const amountFromLocalStorage = localStorage.getItem('savedAmount');
    const conceptFromLocalStorage = localStorage.getItem('savedConcept');

    let expense = {
        amount: parseInt(amountFromLocalStorage),
        concept: conceptFromLocalStorage,
    }

    inputAmount.value="";
    inputConcept.value="";

    printExpense(expense)

});


