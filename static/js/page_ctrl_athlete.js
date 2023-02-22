function get_map_athlete_data() {
    $.ajax({
        url: "/data/map/athlete",
        type: "GET",
        dataType: "json",
        success: function (data) {
            map_athlete_option.options=data.options
            map_athlete_option.baseOption.timeline.data = data.timeline;
            ec_map_athlete.setOption(map_athlete_option);
        },
        error: function () {
            alert("GetDataError!")
        }
    })
}

function get_line_data() {
    $.ajax({
        url: "/data/line_athlete",
        type: "GET",
        dataType: "json",
        success: function (data) {
            line_option.dataset[0].source=data.source;
            // line_option.dataset[0].dimensions=data.dimensions;
            // line_option.xAxis.data = data.timeline;
            ec_line.setOption(line_option);
        },
        error: function () {
            alert("GetDataError!")
        }
    })
}

get_map_athlete_data();
get_line_data();