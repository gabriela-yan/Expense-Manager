// Variables y Selectors
const form = document.querySelector('#agregar-gasto');
const listedExpense = document.querySelector('#gastos ul');


// Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', askBudget);

    // form.addEventListener('submit', addExpense);
}

// Class
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }
}

class UI {

    insertBudget(quantity){
        // console.log(quantity); Test

        // Extracting the value
        const { budget, remaining } = quantity;

        // Add to HTML
        document.querySelector('#total').textContent = budget;
        document.querySelector('#restante').textContent = remaining;
    }
}

// Instance
const ui = new UI();
let budget;


// Functions
function askBudget() {
    const userBudget = prompt('¿Cúal es tu presupuesto?');
    // console.log(Number(userBudget)); Test

    if(userBudget === '' || userBudget == null || isNaN(userBudget) || userBudget <= 0){
        window.location.reload();
        
    }
    // console.log(typeof userBudget); Test

    // Valid budget
    budget = new Budget(userBudget);
    console.log(budget);

    ui.insertBudget(budget);
}

