/**
 * Created by s121367 on 25-Jan-16.
 */
var map = null;
var year;
function initMap(year, myData){
        map = new Datamap({
        scope: 'world',
        element: document.getElementById('mapContainer'),
        projection: 'mercator',
        backgroundColor: 'blue',

        fills: {
            defaultFill: 'black',
            class1: 'rgba(253,208,162,0.9)',
            class2: 'rgba(253,174,107,0.9)',
            class3: 'rgba(253,141,60,0.9)',
            class4: 'rgba(230,85,13,0.9)',
            class5: 'rgba(166,54,3,0.9)'
        },

        data: {
        },

            geographyConfig: {
            popupTemplate: function(geo, data) {
                var output;
                var output2;
                var test = false;
                var year = getYear();
                if (myData[year-1990][geo.id] == ""){
                    for (i = year-1; i >= 1990; i--){
                        if (myData[i-1990][geo.id] != ""){
                            output = "Missing Data";
                            test = true;
                        }
                    }
                    if(!test){
                        output = "0%";
                    }
                    output2 = "No comparison possible";
                    if (year == 1990){
                        output2 = "No earlier data exists";
                    }
                } else if (parseFloat(myData[year-1990][geo.id]).toFixed(4) > 0){
                    var original = parseFloat(parseFloat(myData[year-1990][geo.id]).toFixed(4));
                    var change;
                    output = parseFloat(parseFloat(myData[year-1990][geo.id]).toFixed(4)) + "%";
                    for (i = year-1; i >= 1990; i--){
                        if (myData[i-1990][geo.id] != ""){
                            //console.log(original);
                            change = parseFloat(parseFloat((original / parseFloat(myData[i-1990][geo.id]).toFixed(4))).toFixed(4));
                            //console.log(myData[i-1990][geo.id]);
                            output2 = "change from " + i + ": " + change;
                            break;
                        }
                        output2 = "No earlier data found";
                    }
                    if (year == 1990){
                        output2 = "No earlier data exists";
                    }
                } else {
                    output = "No Data";
                    output2 = "No earlier data exists";
                }
                return ['<div class="hoverinfo" style="margin-left: 396px; margin-top: 12px"><strong>',
                        geo.properties.name,
                        '<br/>' + year,
                        '<br/>' + "Internet users:  " + output,
                        '<br/>' + output2,
                        '</strong></div>'].join('');
            }
        }

    });
}
function updateMap(year){
    setYear(year);
    if (year < 1990 || year > 2011){
        return console.log("error year not within bounds");
    }
    year = year - 1990;
    var max = 0;
    for (var key in myData[year]) {

        if (myData[year].hasOwnProperty(key)) {
            if (parseFloat(myData[year][key]) > parseFloat(max)){
                max = myData[year][key];
            }
        }
    }
    max = parseFloat(parseFloat(max).toFixed(4));
    var range = max / 5.0;
    range = parseFloat(parseFloat(range).toFixed(4));

        $('#class1').text(parseFloat(0.001) + "-" + parseFloat(parseFloat(range-0.001).toFixed(4)) + "%");
        $('#class2').text(parseFloat(parseFloat(range).toFixed(4)) + "-" + parseFloat(parseFloat(2*range-0.001).toFixed(4)) + "%");
        $('#class3').text(parseFloat(parseFloat(2*range).toFixed(4)) + "-" + parseFloat(parseFloat(3*range-0.001).toFixed(4)) + "%");
        $('#class4').text(parseFloat(parseFloat(3*range).toFixed(4)) + "-" + parseFloat(parseFloat(4*range-0.001).toFixed(4)) + "%");
        $('#class5').text(">" + parseFloat(parseFloat(4*range-0.001).toFixed(4)) + "%");



    for (key in myData[year]) {
        //console.log(key);
        if (myData[year].hasOwnProperty(key)) {
            var data = {};
            var value = myData[year][key];
            if (value > 0 && value < range) {
                data[key] = 'rgba(253,208,162,0.9)';
            } else if (value >= range && value < 2*range){
                data[key] = 'rgba(253,174,107,0.9)';
            } else if (value >= 2*range && value < 3*range){
                data[key] = 'rgba(253,141,60,0.9)';
            } else if (value >= 3*range && value < 4*range){
                data[key] = 'rgba(230,85,13,0.9)';
            } else if (value >= 4*range){
                data[key] = 'rgba(166,54,3,0.9)';
            } else {
                data[key] = "grey";
            }
            map.updateChoropleth(data);
        }
    }
}

function setYear(newYear){
    year = newYear;
}
function getYear(){
    return year;
}
    //map.updateChoropleth({
    //    USA: {fillKey: 'class5'},
    //    BTN: {fillKey: 'class5'},
   //     CAN: {fillKey: 'class5'},
    //    BRA: {fillKey: 'class5'},
    //    ARG: {fillKey: 'class5'},
   //     GNB: {fillKey: 'class5'},
   //     ZAF: {fillKey: 'class5'},
   //     MAD: {fillKey: 'class5'}
    //});
