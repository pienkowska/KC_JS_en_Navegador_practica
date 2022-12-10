const newExpense = document.querySelector('#createExpense');
const expenseListElement = document.querySelector(".expenses-list");
const totalListElement = document.querySelector(".totalExpenses")
const expensesList = []

function printExpense(expense) {


    const expenseItem = document.createElement("article");

    const IdCounter = expenseListElement.childElementCount;
    expenseItem.setAttribute("id", IdCounter)

    let expenseElement = `
    <p>Importe: ${expense.amount}, Concepto: ${expense.concept}</p>
    <button onclick="deleteExpense(${expense.id})">Borrar gasto</button>
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

    const IdCounter = expenseListElement.childElementCount;

    //const expenseType = assignType(amountFromLocalStorage);

    let expense = {
        amount: parseInt(amountFromLocalStorage),
        concept: conceptFromLocalStorage,
        id: IdCounter,
        //type: expenseType,
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
    
    let totalAmount = amountsList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   
    let totalElement = `
    <p>${totalAmount}</p>
    `;

    totalListElement.innerHTML = totalElement;

}


function deleteExpense(idToDelete) {

    expensesList.splice(idToDelete, 1)
    addingExpenses(expensesList)

    const articleToRemove = document.getElementById(idToDelete)
    articleToRemove.remove()
    
    addingExpenses(expensesList)

};

function assignType(amountFromLocalStorage) {
    const expenseType = ""
    const amountFromLocalStorageAsNumber = parseInt(amountFromLocalStorage)

    if (amountFromLocalStorageAsNumber > 0) {
        expenseType = "ingreso"
    } else {
        expenseType = "gasto"
    }

    return expenseType
    
};