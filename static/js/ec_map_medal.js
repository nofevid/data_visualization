var ec_map_medal = echarts.init(document.getElementById('map'), 'purple-passion');

var nameMap = {
    'Dem. Rep. Congo': 'Democratic Republic of the Congo',
    'Congo': 'Republic of Congo',
    'Central African Rep.': 'Central African Republic',
    'S. Sudan': 'South Sudan',
    'Dominican Rep.': 'Dominican Republic',
    'Dem. Rep. Korea': 'North Korea',
    'Korea': 'South Korea',
    'Côte d\'Ivoire': 'Cote d\'Ivoire',
    'Antigua and Barb': 'Antigua',
    'Bosnia and Herz.': 'Bosnia and Herzegovina',
    'Central African Rep.': 'Central African Republic',
    'Cayman Is.': 'Cayman Islands',
    'Czech Rep.': 'Czech Republic',
    'Dominican Rep.': 'Dominican Republic',
    'United Kingdom': 'UK',
    'Eq. Guinea': 'Equatorial Guinea',
    'U.S. Virgin Is.': 'Virgin Islands, US',
    'Lao PDR': 'Laos',
    'United States': 'USA',
    'Trinidad and Tobago': 'Trinidad'
}

var map_medal_option = {
    baseOption: {
        // backgroundColor: '#FFFFFF',
        legend: {
            show: false
        },
        title: {
            text: '120 年奥运会奖牌情况',
            subtext: '',
            x: 'left',
            textStyle: {
                fontFamily: "HarmonyOS_Sans_SC_Bold",
                fontWeight: "bolder",
                fontSize: 30,
            }
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            type: 'piecewise',
            show: true,
            pieces: [
                { min: 130 },
                { min: 100, max: 130 },
                { min: 80, max: 100 },
                { min: 60, max: 80 },
                { min: 40, max: 60 },
                { min: 20, max: 40 },
                { min: 10, max: 20 },
                { min: 5, max: 10 },
                { min: 1, max: 5 },
                { max: 0 }
            ],
            text: "",
            x: 'left',
            y: 'bottom',
            calculable: true,
        },
        timeline: {
            show: true,
            axisType: 'category',
            data: []
        },
        series: [
            {
                name: '奖牌总数',
                type: 'map',
                map: 'world',
                nameMap: nameMap,
                roam: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        fontSize: 22
                    }
                },
                showLegendSymbol: false
            }
        ]
    },
    options: []
};

ec_map_medal.setOption(map_medal_option);
