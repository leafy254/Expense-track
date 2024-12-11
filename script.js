


const incomeForm = document.getElementById('income-form'); 
const incomeDescription = document.getElementById('income-description'); 
const incomeAmount = document.getElementById('income-amount'); 

const expenseForm = document.getElementById('expense-form');
const expenseDescription = document.getElementById('expense-description'); 
const expenseAmount = document.getElementById('expense-amount'); 
const expenseCategory = document.getElementById('expense-category'); 

const transactionList = document.getElementById('transaction-history'); 
const totalExpensesElement = document.getElementById('total-expenses'); 
const totalIncomeElement = document.getElementById('total-income'); 
const balanceElement = document.getElementById('balance'); 


incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income');
    updateSummary();
    clearInputs(incomeForm);
});

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = expenseDescription.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    const category = expenseCategory.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, category, 'Expense');
    updateSummary();
    clearInputs(expenseForm);
});

function addTransaction(description, amount, category, type) {
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td> <!-- Added type column -->
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionList.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });
}

function updateSummary() {
    let totalExpenses = 0;
    let totalIncomes = 0;

    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const type = transaction.children[3].textContent;

        if (type === 'Income') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalExpensesElement.textContent = totalExpenses.toFixed(2);
    totalIncomeElement.textContent = totalIncomes.toFixed(2);
    balanceElement.textContent = (totalIncomes - totalExpenses).toFixed(2);
}

function clearInputs(form) {
    form.reset();
}
