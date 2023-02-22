var ec_map_athlete = echarts.init(document.getElementById('map_athlete'), 'purple-passion');

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
};

var map_athlete_option = {
    baseOption: {
        // backgroundColor: '#FFFFFF',
        legend: {
            show: false,
        },
        title: {
            text: '120 年奥运会运动员情况',
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
                { min: 600 },
                { min: 320, max: 600 },
                { min: 160, max: 320 },
                { min: 80, max: 160 },
                { min: 40, max: 80 },
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
                name: '参赛人数',
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

ec_map_athlete.setOption(map_athlete_option);

ec_map_athlete.on("click", function (params) {
    console.log(params)
    if (params.componentType !== 'series') {
        return
    }
    // alert(params.name);
    // console.log(line_option.dataset[0].transform)
    line_option.dataset[1].transform.config['value'] = params.name;
    line_option.title.subtext=params.name;
    ec_line.setOption(line_option)
})
