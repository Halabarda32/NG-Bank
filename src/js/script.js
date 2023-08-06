const navMobile = document.querySelector('.nav__items-mobile')
const navBtn = document.querySelector('.nav__burger-btn')
const allNavItems = document.querySelectorAll('.nav__item-mobile')
const navBtnBars = document.querySelector('.burger-btn__bars')
const nav = document.querySelector('.nav')
const navList = document.querySelector('.nav__items')
const menuItems = document.querySelectorAll('.nav__item')
const bodySite = document.querySelector('.body')
const scrollSpySection = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')
const counterItems = document.querySelectorAll('.counter')
const counterBox = document.querySelector('.counter__box')
const mainContent = document.querySelector('header')
const cookieBox = document.querySelector('.cookie__box')
const cookieBtn = document.querySelector('.cookie__box-btn')

const options = {
	rootMargin: '-180px',
}

const scrollMargin = {
	rootMargin: '-96px',
}

const showCookie = () => {
	const cookieEaten = localStorage.getItem('cookie')

	if (cookieEaten) {
		cookieBox.classList.add('hide')
	}
}

const handleCookieBox = () => {
	localStorage.setItem('cookie', 'true')
	cookieBox.classList.add('hide')
}

showCookie()

const handleNav = () => {
	navMobile.classList.toggle('nav__items-mobile--active')
	bodySite.classList.toggle('body-lock')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			navMobile.classList.remove('nav__items-mobile--active')
			bodySite.classList.remove('body-lock')
		})
	})
}

document.addEventListener('DOMContentLoaded', function () {
	function addShadow() {
		if (window.scrollY >= 170) {
			nav.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
		} else {
			nav.style.backgroundColor = 'transparent'
		}
	}

	window.addEventListener('scroll', addShadow)
})

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()

const startObserver = entry => {
	if (entry[0].isIntersecting === false) {
		const handleScrollSpy = () => {
			if (document.body.classList.contains('body')) {
				const sections = []

				scrollSpySection.forEach(section => {
					if (window.scrollY <= section.offsetTop + section.offsetHeight - 96) {
						sections.push(section)

						const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)

						menuItems.forEach(item => item.classList.remove('active'))

						activeSection?.classList.add('active')
					}
				})
			}
		}
		window.addEventListener('scroll', handleScrollSpy)
	}
}

const scrollObserver = new IntersectionObserver(startObserver, scrollMargin)
scrollObserver.observe(mainContent)

const startCounter = entry => {
	if (entry[0].isIntersecting) {
		counterItems.forEach(counter => {
			const updateCounter = () => {
				const finalNumber = counter.getAttribute('data-number')
				const value = parseInt(counter.textContent)

				const speed = finalNumber / 300

				if (value < finalNumber) {
					counter.textContent = `${Math.floor(value + speed)}`
					setTimeout(updateCounter, 1)
				} else {
					counter.textContent = finalNumber
				}
			}

			updateCounter()
		})
	}
}

const observer = new IntersectionObserver(startCounter, options)
observer.observe(counterBox)

cookieBtn.addEventListener('click', handleCookieBox)
navBtn.addEventListener('click', handleNav)
