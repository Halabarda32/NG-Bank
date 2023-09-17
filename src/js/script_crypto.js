const navMobile = document.querySelector('.nav__items-mobile')
const navBtn = document.querySelector('.nav__burger-btn')
const bodySite = document.querySelector('.body')
const allNavItems = document.querySelectorAll('.nav__item-mobile')
const nav = document.querySelector('.nav')
const currencyBtn = document.querySelector('.currency-btn')
const curerncyModal = document.querySelector('.exchange__modal')
const allCurrency = document.querySelectorAll('.exchange-btn')
const modalCloseBtn = document.querySelector('.fa-rectangle-xmark')
const footerYear = document.querySelector('.footer__year')

const fetchCoinData = async () => {
	const apiUrl = 'https://api.coincap.io/v2/assets'

	try {
		const response = await fetch(apiUrl)
		if (!response.ok) {
			throw new Error('error')
		}
		const data = await response.json()
		const coins = data.data.slice(0, 40).map(coin => ({
			rank: coin.rank,
			id: coin.id,
			price: parseFloat(coin.priceUsd).toFixed(2),
			change: parseFloat(coin.changePercent24Hr).toFixed(2),
			volume: parseFloat(coin.volumeUsd24Hr / 1000000).toFixed(2),
			market: parseFloat(coin.marketCapUsd / 1000000).toFixed(2),
		}))

		createTable(coins)

		const exchangeBtns = document.querySelectorAll('.exchange-btn')
		exchangeBtns.forEach(button => {
			button.addEventListener('click', () => {
				const currency = button.getAttribute('data-currency')
				exchangePrice(currency, coins)
				currencyBtn.textContent = currency
				currencyBtn.innerHTML = `${currency} <i class="fa-solid fa-caret-down"></i>`
			})
		})
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

const createTable = coins => {
	const tableBody = document.querySelector('.coinTable tbody')
	coins.forEach(coin => {
		const newRow = document.createElement('tr')
		newRow.innerHTML = `
			<td scope="row" data-label="Pozycja">${coin.rank}</td>
			<td data-label="Nazwa">${coin.id}</td>
			<td data-label="Cena">USD ${coin.price}</td>
			<td class="${coin.change < 0 ? 'negative-num' : 'positive-num'}" data-label="24h">${coin.change}%</td>
			<td data-label="Wolumen-24h">USD ${coin.volume}M</td>
			<td data-label="Kapitalizacja">USD ${coin.market}M</td>
		`
		tableBody.appendChild(newRow)
	})
}

const fetchRatesData = async () => {
	const apiUrlRates = 'https://api.coincap.io/v2/rates'

	try {
		const response = await fetch(apiUrlRates)
		if (!response.ok) {
			throw new Error('error')
		}
		const data = await response.json()
		const rates = data.data.map(rate => ({
			id: rate.id,
			symbol: rate.symbol,
			currency: rate.currencySymbol,
			rateUsd: rate.rateUsd,
		}))

		window.exchangeRates = {
			GBP: {
				rate: rates.find(rate => rate.symbol === 'GBP').rateUsd,
				symbol: rates.find(rate => rate.symbol === 'GBP').symbol,
			},
			PLN: {
				rate: rates.find(rate => rate.symbol === 'PLN').rateUsd,
				symbol: rates.find(rate => rate.symbol === 'PLN').symbol,
			},
			USD: {
				rate: 1.0,
				symbol: rates.find(rate => rate.symbol === 'USD').symbol,
			},
		}
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

const exchangePrice = (currency, coins) => {
	const tableRows = document.querySelectorAll('.coinTable tbody tr')
	const usdRate = window.exchangeRates[currency].rate
	const currencySymbol = window.exchangeRates[currency].symbol

	closeCurrency()

	coins.forEach((coin, index) => {
		const priceCell = tableRows[index].querySelector('td:nth-child(3)')
		const volumeCell = tableRows[index].querySelector('td:nth-child(5)')
		const marketCell = tableRows[index].querySelector('td:nth-child(6)')

		let basePrice = parseFloat(coin.price)
		let baseVolume = parseFloat(coin.volume)
		let baseMarket = parseFloat(coin.market)

		if (currency !== 'USD') {
			basePrice = (basePrice / usdRate).toFixed(2)
			baseVolume = (baseVolume / usdRate).toFixed(2)
			baseMarket = (baseMarket / usdRate).toFixed(2)
		}

		const newPrice = `${currencySymbol} ${basePrice}`
		const newVolume = `${currencySymbol} ${baseVolume}`
		const newMarket = `${currencySymbol} ${baseMarket}`

		priceCell.textContent = newPrice + 'M'
		volumeCell.textContent = newVolume + 'M'
		marketCell.textContent = newMarket + 'M'
	})
}

fetchCoinData()
fetchRatesData()

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

const handleCurrency = () => {
	bodySite.classList.add('body-lock')
	curerncyModal.classList.toggle('exchange__modal--active')
}

const closeCurrency = () => {
	bodySite.classList.remove('body-lock')
	curerncyModal.classList.remove('exchange__modal--active')
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

navBtn.addEventListener('click', handleNav)
currencyBtn.addEventListener('click', handleCurrency)
modalCloseBtn.addEventListener('click', closeCurrency)
