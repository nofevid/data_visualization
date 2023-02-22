var ec_line = echarts.init(document.getElementById("linechart"), 'purple-passion')

var line_option = {
	title: {
		text: '参赛运动员人数'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
		}
	},
	legend: {
		data: ['Medal', 'Male', 'Female']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		// containLabel: true
	},
	dataset: [
		{
			dimensions: ['year','region', 'Medal', 'Total Sum','Male','Female'],
			source: [
				{year:1, region:2, Total_Sum:3, Male:4, Female:5},
				{year:1, region:2, Total_Sum:3, Male:4, Female:5},
				{year:1, region:2, Total_Sum:3, Male:4, Female:5},
				{year:1, region:2, Total_Sum:3, Male:4, Female:5},
				{year:1, region:2, Total_Sum:3, Male:4, Female:5},
				{year:1, region:2, Total_Sum:3, Male:4, Female:5}
			]
		},
		{
			transform: {
				type: 'filter',
				config: {
					dimension: 'region', value: 'China'
				}
			}
		},
	],
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
		}
	],
	yAxis: [
		{
			type: 'value'
		},
		{
			position: 'right',
			type: 'value'
		}
	],
	series: [
		{
			type: 'line',
			seriesLayoutBy: 'row',
			datasetIndex: 1
		},
		{
			name: 'Medal',
			type: 'line',
			yAxisIndex: 1,
			// stack: 'Total',
			emphasis: {
				focus: 'series'
			},
			seriesLayoutBy: 'row',
			datasetIndex: 1
		},
		{
			name: 'Total Sum',
			type: 'scatter',
			// stack: 'Total',
			// areaStyle: {},
			label: {
				show: true,
				position: 'top'
			},
			emphasis: {
				focus: 'series'
			},
			seriesLayoutBy: 'row',
			datasetIndex: 1
		},
		{
			name: 'Male',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			seriesLayoutBy: 'row',
			datasetIndex: 1
		},
		{
			name: 'Female',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series'
			},
			seriesLayoutBy: 'row',
			datasetIndex: 1
		},
		// {
		// 	type: 'pie',
		// 	id: 'pie',
		// 	radius: '30%',
		// 	center: ['50%', '25%'],
		// 	emphasis: {
		// 		focus: 'self'
		// 	},
		// 	// label: {
		// 	//   	formatter: '{@Male}'
		// 	// },
		// 	seriesLayoutBy: 'column',
		// 	datasetIndex: 2,
		// 	encode: {
		// 		itemName: [['Male', 'Female']],
		// 		value: [['Male', 'Female']],
		// 	}
      	// }
	]
};

ec_line.setOption(line_option);