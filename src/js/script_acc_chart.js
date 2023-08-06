var options = {
	series: [
		{
			name: 'Inwestycje',
			data: [1789, 2400, 1100, 2400, 2700, 3000, 3500, 4200, 4200, 4200],
		},
		{
			name: 'Saldo',
			data: [6654, 7688, 3123, 4491, 5671, 5890, 8400, 9845, 6234, 5089],
		},
		{
			name: 'Wydatki',
			data: [1765, 2231, 743, 1740, 2200, 4302, 1899, 7768, 5786, 2004],
		},
	],
	colors: ['#cbb279', '#13c86c', '#ff6868'],
	chart: {
		type: 'bar',
		height: 350,
		foreColor: '#ebecf2',
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '90%',
			endingShape: 'rounded',
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 0,
		colors: ['transparent'],
	},
	xaxis: {
		categories: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip' , 'Sie' , 'Wrz' , 'Paź'],
	},
	fill: {
		opacity: 1,
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return val + 'zł'
			},
		},
	},
}

var chart = new ApexCharts(document.querySelector('#chart'), options)
chart.render()
