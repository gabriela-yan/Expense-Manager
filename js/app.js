// Variables y Selectors
const form = document.querySelector('#agregar-gasto');
const listedExpense = document.querySelector('#gastos ul');


// Events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', askBudget);

    form.addEventListener('submit', addExpense);
}

// Class
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }

    newExpense(expense){
        // console.log(expense); Test
        this.expenses = [...this.expenses, expense];
        console.log(this.expenses);
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

    printAlert(message, type) {
        // Create div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');

        if(type === 'error'){
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        // Error message
        divMessage.textContent = message;

        // Insert to HTML
        document.querySelector('.primario').insertBefore(divMessage, form);

        // Remove from HTML
        setTimeout(() => {
            divMessage.remove();
        },3000);
    }

    addListedExpense(expenses) {
        // console.log(expenses); Test
        this.cleanHTML(); // Remove previous HTML

        // Iterate over expenses
        expenses.forEach(expense => {
            const { expenseName, quantity, id } = expense;

            // Create li
            const newExpense = document.createElement('li');
            newExpense.className = 'list-group-item d-flex justify-content-between align-items-center';

            // newExpense.setAttribute('data-id',id); but in new version of JS use
            newExpense.dataset.id = id;

            // console.log(newExpense); Test

            // Add the expense HTML
            newExpense.innerHTML = `${expenseName} <span class="badge badge-primary badge-pill">${quantity}</span> `;
            
            // Button for delete expense
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnDelete.textContent = 'Borrar';

            newExpense.appendChild(btnDelete);

            // Add to HTML
            listedExpense.appendChild(newExpense);
        });
    }

    cleanHTML() {
        while(listedExpense.firstChild){
            listedExpense.removeChild(listedExpense.firstChild);
        }
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

function addExpense(e) {
    e.preventDefault();

    // Read the form data
    const expenseName = document.querySelector('#gasto').value;
    const quantity = Number(document.querySelector('#cantidad').value);

    if(expenseName === '' || quantity === ''){
        ui.printAlert('Ambos campos son obligatorios','error');
        return;
    } else if(quantity <= 0 || isNaN(quantity)) {
        ui.printAlert('Cantidad no válida', 'error');
        return;
    }
    // console.log('Agregando gasto...'); Test

    // Generate an object with the expense
    const expense = { expenseName, quantity, id: Date.now() };
    // console.log(expenses); Test

    // Add new expense
    budget.newExpense(expense);

    // Message success
    ui.printAlert('Gasto agregado correctamente');

    // Print expense
    const { expenses } = budget;
    ui.addListedExpense(expenses);

    // Form reset
    form.reset();

}

