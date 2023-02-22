function get_map_medal_data() {
    $.ajax({
        url: "/data/map/medal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            map_medal_option.options=data.options
            map_medal_option.baseOption.timeline.data = data.timeline;
            ec_map_medal.setOption(map_medal_option);
        },
        error: function () {
            alert("GetDataError!")
        }
    })
}

function get_bar_data() {
    $.ajax({
        url: "/data/bar_medal",
        type: "GET",
        dataType: "json",
        success: function (data) {
            bar_option.options=data.options;
            bar_option.baseOption.timeline.data = data.timeline;
            ec_bar.setOption(bar_option);
        },
        error: function () {
            alert("GetDataError!")
        }
    })
}

get_map_medal_data();
get_bar_data();