const navMobile = document.querySelector('.nav__items-mobile')
const navBtn = document.querySelector('.nav__burger-btn')
const bodySite = document.querySelector('.body')
const allNavItems = document.querySelectorAll('.nav__item-mobile')
const nav = document.querySelector('.nav')
const footerYear = document.querySelector('.footer__year')
const accordion = document.querySelector('.accordion')
const accordionBtns = document.querySelectorAll('.accordion__box-btn')
const debitBtn = document.querySelector('.debit-number__btn')
const debitText = document.querySelector('.debit-number__btn-text')
const messagesPanel = document.querySelector('.messages-panel')
const messagesBtnDesktop = document.querySelector('.messages')
const messagesBtnMobile = document.querySelector('.messages-mobile')
const messagesBtnClose = document.querySelector('.messages-close')
const welcomeMessage = document.querySelector('.welcome-message')
const MessBtns = document.querySelectorAll('.message__box-text-button')
const messText = document.querySelector('.messages__box-show-message-text')
const messTextBtn = document.querySelector('.messages__box-show-message-text-btn')
const MessBtn1 = document.getElementById('btn-1')
const MessBtn2 = document.getElementById('btn-2')
const MessBtn3 = document.getElementById('btn-3')
const MessBtn4 = document.getElementById('btn-4')
const MessBtn5 = document.getElementById('btn-5')

const handleNav = () => {
	navMobile.classList.toggle('nav__items-mobile--active')
	bodySite.classList.add('body-lock')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('nav__items-mobile--active')
		})
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()

const openPanel = () => {
	bodySite.classList.add('body-lock')
	messagesPanel.classList.toggle('messages-panel--active')
}

const closePanel = () => {
	messagesPanel.classList.remove('messages-panel--active')
	bodySite.classList.remove('body-lock')
}

document.addEventListener('DOMContentLoaded', function () {
	function addShadow() {
		if (window.scrollY >= 100) {
			navBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
		} else {
			navBtn.style.backgroundColor = 'transparent'
		}
	}

	window.addEventListener('scroll', addShadow)
})

function openAccordionItems() {
	if (this.nextElementSibling.classList.contains('active')) {
		this.nextElementSibling.classList.remove('active')
	} else {
		closeAccordionItems()
		this.nextElementSibling.classList.toggle('active')
	}
}

const closeAccordionItems = () => {
	const allActiveItems = document.querySelectorAll('.accordion__box-info')
	allActiveItems.forEach(item => item.classList.remove('active'))
}

const clickOutside = e => {
	if (
		e.target.classList.contains('accordion__box-btn') ||
		e.target.classList.contains('accordion__box-info') ||
		e.target.classList.contains('accordion-info-title') ||
		e.target.classList.contains('accordion-info-text')
	)
		return
	closeAccordionItems()
}

const handleDebitNumber = () => {
	debitText.classList.toggle('debit-number-secure')
}

const showMessageMobile = btn => {
	const allMessages = document.querySelectorAll('.message__box-show')
	allMessages.forEach(message => (message.style.display = 'none'))
	messText.style.display = 'flex'

	const MessageToShow = document.querySelector(`[data-button="${btn}"]`)
	MessageToShow.style.display = 'block'
}

const showMessage = btn => {
	const allMessages = document.querySelectorAll('.message__box-show')
	allMessages.forEach(message => (message.style.display = 'none'))

	const MessageToShow = document.querySelector(`[data-button="${btn}"]`)
	welcomeMessage.style.display = 'none'
	MessageToShow.style.display = 'block'
}

const changeFontWeight = e => {
	const button = e.target
	const messBox = button.closest('.message__box')
	const messTitle = messBox.querySelector('.message__box-heading-title')
	messTitle.style.fontWeight = 200
}

const closeMessageMobile = () => {
	messText.style.display = 'none'
}

accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems))
window.addEventListener('click', clickOutside)

debitBtn.addEventListener('click', handleDebitNumber)
navBtn.addEventListener('click', handleNav)
messagesBtnDesktop.addEventListener('click', openPanel)
messagesBtnMobile.addEventListener('click', openPanel)
messagesBtnClose.addEventListener('click', closePanel)

MessBtn1.addEventListener('click', function () {
	showMessage('btn-1'), showMessageMobile('btn-1')
})
MessBtn2.addEventListener('click', function () {
	showMessage('btn-2'), showMessageMobile('btn-2')
})
MessBtn3.addEventListener('click', function () {
	showMessage('btn-3'), showMessageMobile('btn-3')
})
MessBtn4.addEventListener('click', function () {
	showMessage('btn-4'), showMessageMobile('btn-4')
})
MessBtn5.addEventListener('click', function () {
	showMessage('btn-5'), showMessageMobile('btn-5')
})
MessBtns.forEach(button => {
	button.addEventListener('click', changeFontWeight)
})
messTextBtn.addEventListener('click', closeMessageMobile)
