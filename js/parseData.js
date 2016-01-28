/**
 * Created by s121367 on 25-Jan-16.
 */
var myData = 10;
var year = 2011;
var sortedData = [];
var sortedData2 = [];
$(document).ready(function() {
    var dsv = d3.dsv(";", "text/plain");
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    var countryMap = [];
    for (i = 0; i < countries.length; i++){
        var key = countries[i].id;
        countryMap[key] = countries[i].properties.name;
    }
    //console.log(countryMap);
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
                if (data[i].hasOwnProperty(key) && countryMap[key] != undefined) {
                    sortedData[i].push([key, countryMap[key], data[i][key]]);
                }
            }
            //console.log(sortedData[0].length);
            sortedData[i] = sortedData[i].sort(function(a, b){return b[2]-a[2]});
            for(z = 0; z < 168; z++) {
                if (i != 0) {
                    for (j = 0; j < 168; j++) {
                        if (sortedData[i][z][0] == sortedData[i - 1][j][0]) {
                            //z = new rank + 1
                            //j = old rank + 1
                            if (j > z) {
                                sortedData[i][z][3] = 1;
                                break;
                            } else if (j < z) {
                                sortedData[i][z][3] = -1;
                                break;
                            } else {
                                //console.log(j + " " + z);
                                sortedData[i][z][3] = 0;
                                break;
                            }
                        }
                    }
                } else {
                    sortedData[i][z][3] = 0;
                }
            }
        }


        //window.alert(sortedData);
        myData = data;
        //window.alert(myData);
        setSortedData(sortedData);
        initMap(year, myData, sortedData);
        updateMap(year);

    });


});

    function getSortedData(){
        return sortedData;
    }

function setSortedData(data){
    sortedData2 = data;
}