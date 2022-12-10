const newExpense = document.querySelector('#createExpense');
const expenseListElement = document.querySelector(".expenses-list");
const totalListElement = document.querySelector(".totalExpenses")
const expensesList = []

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

    expensesList.push(expense)

    inputAmount.value="";
    inputConcept.value="";

    printExpense(expense)
    addingExpenses(expensesList)

});

function addingExpenses(expensesList) {
    const amountsList = []
    expensesList.forEach(expense => {
        amountsList.push(expense.amount)
    });
    
    let totalAmount = amountsList.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    debugger;

    
    const totalItem = document.createElement("article");

    let totalElement = `
    <p>${totalAmount}</p>
  `

    totalItem.innerHTML = totalElement;

    totalListElement.prepend(totalItem);
    

    //totalListElement.prepend(totalItem);
    //totalListElement.replaceChild(totalItem)
    
}
