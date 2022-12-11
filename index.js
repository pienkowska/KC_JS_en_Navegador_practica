const newExpense = document.querySelector('#createExpense');
const expenseListElement = document.querySelector(".expenses-list");
const totalListElement = document.querySelector(".totalExpenses");
const incomingTotalListElement = document.querySelector(".totalIncoming");
const outgoingTotalListElement = document.querySelector(".totalOutgoing")
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

    const expenseType = assignType(amountFromLocalStorage);

    let expense = {
        amount: parseInt(amountFromLocalStorage),
        concept: conceptFromLocalStorage,
        id: IdCounter,
        type: expenseType,
    }

    expensesList.push(expense)

    inputAmount.value="";
    inputConcept.value="";

    printExpense(expense)
    addingExpenses(expensesList)
    totalIncoming(expensesList)
    totalOutgoing(expensesList)

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
    totalIncoming(expensesList)
    totalOutgoing(expensesList)

};

function assignType(amount) {
    let expenseType = ""

    if (amount > 0) {
        expenseType = "ingreso"
    } else {
        expenseType = "gasto"
    }

    debugger;
    return expenseType
    
};

function totalIncoming(expensesList) {
    const incomingElementsList = expensesList.filter(expense => expense.type === "ingreso")

    const incomingsList = []
    incomingElementsList.forEach(expense => {
        incomingsList.push(expense.amount)
    })

    let incomingsTotalAmount = incomingsList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let incomingsTotalElement = `
    <p>${incomingsTotalAmount}</p>
    `;

    incomingTotalListElement.innerHTML = incomingsTotalElement

}

function totalOutgoing(expensesList) {
    const outgoingElementsList = expensesList.filter(expense => expense.type === "gasto")

    const outgoingsList = []
    outgoingElementsList.forEach(expense => {
        outgoingsList.push(expense.amount)
    })

    let outgoingsTotalAmount = outgoingsList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let outgoingTotalElement = `
    <p>${outgoingsTotalAmount}</p>
    `;

    outgoingTotalListElement.innerHTML = outgoingTotalElement

}