const incomeSection = document.querySelector('.income__area')
const expensesSection = document.querySelector('.expenses__area')
const availableMoney = document.querySelector('.balance__available-money')
const transactionPanel = document.querySelector('.add-transaction-panel')
const transactionBtns = document.querySelectorAll('.add-transaction-panel__btns')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteAllBtn = document.querySelector('.delete-all')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const handleTransactionPanel = () => {
	transactionPanel.classList.toggle('add-transaction-panel--active')
	bodySite.classList.toggle('body-lock')

	cancelBtn.addEventListener('click', () => {
		transactionPanel.classList.remove('add-transaction-panel--active')
		bodySite.classList.remove('body-lock')
		clearInputs()
	})
}

const checkForm = () => {
	if (
		nameInput.value !== '' &&
		nameInput.value.length < 11 &&
		amountInput.value !== '' &&
		amountInput.value > 0 &&
		categorySelect.value !== 'none'
	) {
		createNewTransaction()
	} else {
		alert('Wypełnij wszystkie pola!')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	checkCategory(selectedCategory)

	if (categorySelect.selectedIndex <= 3) {
		newTransaction.innerHTML = `
        <p class="transaction-name">
        ${categoryIcon} ${nameInput.value}
        </p>
        <p class="transaction__amount">
        ${amountInput.value}zł 
        <button class="delete" onclick="deleteTransatcion(${ID})"><i class="fas fa-times"></i></button>
        </p>
        `
		moneyArr.push(parseFloat(amountInput.value))
	} else {
		newTransaction.innerHTML = `
        <p class="transaction-name">
        ${categoryIcon} ${nameInput.value}
        </p>
        <p class="transaction__amount">
        ${-amountInput.value}zł 
        <button class="delete" onclick="deleteTransatcion(${ID})"><i class="fas fa-times"></i></button>
        </p>
        `
		moneyArr.push(parseFloat(-amountInput.value))
	}

	categorySelect.selectedIndex <= 3
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense')
	countMoney(moneyArr)
	handleTransactionPanel()
	ID++
	clearInputs()
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const checkCategory = transaction => {
	switch (transaction) {
		case '[ + ] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ + ] Przychód z inwestycji':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ + ] Wypłata':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case '[ - ] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case '[ - ] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case '[ - ] Inwestycje':
			categoryIcon = '<i class="fa-solid fa-money-bill-trend-up"></i>'
			break
		case '[ - ] Rozrywka':
			categoryIcon = '<i class="fas fa-film"></i>'
			break
		case '[ - ] Usługi':
			categoryIcon = '<i class="fa-solid fa-shop"></i>'
			break
		case '[ - ] Rachunki':
			categoryIcon = '<i class="fa-solid fa-receipt"></i>'
			break
		case '[ - ] Wypłata środków':
			categoryIcon = '<i class="fa-solid fa-wallet"></i>'
			break
	}
}

const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney}zł`
}

const deleteTransatcion = id => {
	const transactionToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)

	moneyArr.splice(indexOfTransaction, 1)

	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete)
	countMoney(moneyArr)
}

const deleteAllTransactions = () => {
	incomeSection.innerHTML = '<h3>Przychód:</h3>'
	expensesSection.innerHTML = '<h3>Wydatki:</h3>'
	availableMoney.textContent = '0zł'
	moneyArr = [0]
}

addTransactionBtn.addEventListener('click', handleTransactionPanel)
// cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransactions)
