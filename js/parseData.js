/**
 * Created by s121367 on 25-Jan-16.
 */
var myData = 10;
var year = 2011;
var sortedData = [];
$(document).ready(function() {
    var dsv = d3.dsv(";", "text/plain");
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    var countryMap = [];
    for (i = 0; i < countries.length; i++){
        //var obj = {};
        //obj[key] = countries[i].properties.name;
        //countryMap.push(obj);
        var key = countries[i].id;
        countryMap[key] = countries[i].properties.name;
    }
    console.log(countryMap);
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

        for (i = 0; i < data.length; i++){
            sortedData[i] = [];
            for (var key in data[i]) {
                if (data[i].hasOwnProperty(key)) {
                    sortedData[i].push([key, countryMap[key], data[i][key]]);
                }
            }
            sortedData[i] = sortedData[i].sort(function(a, b){return b[2]-a[2]});
        }

        console.log(sortedData);
        //window.alert(sortedData);
        myData = data;
        //window.alert(myData);
        initMap(year, myData);
        updateMap(year);

    });
});
