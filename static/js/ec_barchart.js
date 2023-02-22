var ec_bar = echarts.init(document.getElementById("barchart"), 'purple-passion')

var bar_option = {
	baseOption: {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				// Use axis to trigger tooltip
				type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
			}
		},
		title: {
            text: '120 年奥运会奖牌榜',
            subtext: '',
            x: 'left',
            textStyle: {
                fontFamily: "FangZhengHeiTi",
                fontWeight: "bolder",
                fontSize: 30,
            }
        },
		timeline: {
			show: true,
			axisType: 'category',
			// bottom: -10,
			data: []
		},
		legend: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			show: false
		},
		yAxis: {
			type: 'category',
			inverse: true,
			max: 10
		},
		series: [
			{
				realtimeSort:true,
				name: 'Gold',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				// data: [[320,1], [302,2], [301,3], [334,4], [390,5], [330,6], [320,1]]
				itemStyle: {
        			normal: {
            			barBorderRadius:[0,15,15,0]
					}
				},
			},
			{
				name: 'Silver',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				// data: [[120,7], [132,8], [101, 9], [134,10], 90, [182,11], [210,12]]
				itemStyle: {
        			normal: {
            			barBorderRadius:[15,15,15,15]
					}
				},
			},
			{
				name: 'Bronze',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				// data: [[134,10], [182,11], [182,11], [182,11], [134,10], [330,6], [320,13]]
				itemStyle: {
        			normal: {
            			barBorderRadius:[15,15,15,15]
					}
				},
			},
		],
	},
	options: [
		// {
        //     series: [
        //         {
		// 			data:[[320,1], [302,2], [301,3], [334,4], [390,5], [330,6], [320,7]]
        //         },
		// 		{
		// 			data: [[120,1], [132,2], [101, 3], [134,4], [90,5], [182,6], [210,7]]
		// 		},
		// 		{
		// 			data: [[134,1], [182,2], [182,3], [182,4], [134,5], [330,6], [320,7]]
		// 		},
        //     ]
        // },
        // {
        //     series: [
        //         {
        //             data: [[320,1], [302,2], [301,3], [334,4], [390,5], [330,6], [320,7]]
        //         },
		// 		{
		// 			data: [[320,7], [302,8], [301,9], [334,10], [390,12], [330,11], [320,13]]
		// 		},
		// 		{
		// 			data: [[120,10], [132,11], [101, 12], [134,13], [90,14], [182,15], [210,16]]
		// 		},
		// 		{
		// 			data: [[134,10], [182,11], [182,11], [182,11], [134,10], [330,6], [320,13]]
		// 		},
        //     ]
        // },
        // {
        //     series: [
        //         {
        //             data: [[320,1], [302,2], [301,3], [334,4], [390,5], [330,6], [320,7]]
        //         },
		// 		{
		// 			data: [[134,7], [182,8], [182,9], [182,10], [134,12], [330,11], [320,13]]
		// 		},
		// 		{
		// 			data: [[320,10], [302,11], [301,12], [334,13], [390,14], [330,15], [320,16]]
		// 		},
		// 		{
		// 			data: [[120,7], [132,8], [101, 9], [134,10], [90,13], [182,11], [210,12]]
		// 		},
        //     ]
        // }
	]
};

ec_bar.setOption(bar_option);
