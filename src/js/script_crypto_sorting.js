const sortTable = columnIndex => {
	const table = document.querySelector('.coinTable')
	const rows = Array.from(table.getElementsByTagName('tr'))

	rows.shift()

	rows.sort((a, b) => {
		const cellA = a.getElementsByTagName('td')[columnIndex].innerText
		const cellB = b.getElementsByTagName('td')[columnIndex].innerText
		return cellA.localeCompare(cellB, undefined, { numeric: true, sensitivity: 'base' })
	})

	const currentOrder = table.getAttribute('data-order') || 'asc'
	if (currentOrder === 'asc') {
		rows.reverse()
		table.setAttribute('data-order', 'desc')
	} else {
		table.setAttribute('data-order', 'asc')
	}

	const tbody = table.getElementsByTagName('tbody')[0]
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild)
	}

	rows.forEach(row => tbody.appendChild(row))
}
