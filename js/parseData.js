/**
 * Created by s121367 on 25-Jan-16.
 */
var myData = 10;
var year = 2005;
var sortedData = [];
$(document).ready(function() {
    var dsv = d3.dsv(";", "text/plain");
    dsv("data/internetNoName.csv", function (error, data) {//callback function after error or finishing data is loaded
        if (error) {//Data didn't load properly
            console.log(error);
        } else {
            //console.log(data[0].BRA);
            //for (var key in data[0]) {
            //    if (data[0].hasOwnProperty(key)) {
            //        console.log(key + " -> " + data[0][key]);
            //    }
            //}

        }
        //Functions to call after the data has been loaded

        for (i = 1; i < data.length; i++){
            for (var key in data[i]) {
                sortedData.push([i, [key, data[key]]]);
                sortedData.sort(function (a, b) {
                    return b[1] - a[1];
                });
            }
        }
        //window.alert(sortedData);
        myData = data;
        //window.alert(myData);
        initMap(year, myData);
        updateMap(year);

    });
});
