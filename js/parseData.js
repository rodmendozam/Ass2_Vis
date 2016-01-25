/**
 * Created by s121367 on 25-Jan-16.
 */
var myData = 10;
var year = 1991;
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
        myData = data;
        //window.alert(myData);
        initMap(year, myData);
        updateMap(year);

    });
});
