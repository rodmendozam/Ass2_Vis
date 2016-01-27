/**
 * Created by s150834 on 25-1-2016.
 */

//Variables
var selected_year_from_list = 2011;

$(document).ready(function() {//when the DOM has loaded
        $( "#rankingList" ).accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
        //$('#rankingList').accordion('activate', false);
    //init variables
    $('#yearButton').text(selected_year_from_list);

    $('#yearMenu li').click(function() {//add event listener to dropdown menu
        $('#yearMenu li').removeClass('yearSelected');
        $(this).addClass('yearSelected');
        selected_year_from_list = $('.yearSelected').text();

        $('#yearButton').text(selected_year_from_list);

        //Update Map
        updateMap(selected_year_from_list);

        //UpdateRanking

        //UpdateIndexChart
        cleanAllLinesFromIndexChart();
    });




});
//0 = id
//1 = country
//2 = %
//3 = change
function updateList(year){
        year = year - 1990;
        $( "#rankingList").html("");
    for(i = 0; i < 168; i++){
        //console.log(sortedData);
        //console.log(sortedData[year][i][1]);
        //console.log("<h3>"+  sortedData[year][i][1]+"</h3> <div> <p>"+ year+1990 + " " + parseInt(i+1) + "/207 " + sortedData[year][i][3] + "</p></div>");
        var content = '';
        var index;
        //console.log(getColorData());
        var colorData = getColorData();
        for (j = 1990; j < 2012; j++){
            for(z = 0; z < 168; z++){
                if (sortedData[j-1990][z][0] == sortedData[year][i][0]){
                    index = z + 1;
                    break;
                }
            }
            content += "<div><p>" + parseInt(j) + "</p> <p>" + index + "/168</p> <p>" + sortedData[j-1990][index-1][3] + "</p></div>";

        }
        if (sortedData[year][i][2] != "" && (colorData[sortedData[year][i][0]] != 'rgba(253,208,162,0.9)' && colorData[sortedData[year][i][0]] != 'rgba(253,174,107,0.9)')) {
            $("#rankingList").append("<h3 id=" + sortedData[year][i][0] + "><p class='rankNumber'  style='text-align: center; float: left; width: 35px; color: white; background-color: " + colorData[sortedData[year][i][0]] + "'>" + parseInt(i + 1) + "<\p> <p class = 'country'>" + sortedData[year][i][1] + "</p> <p class='perc'>" + parseFloat(parseFloat(sortedData[year][i][2]).toFixed(2)) + "\%</p></h3> <div>" + content + "</div>");
        } else  if (colorData[sortedData[year][i][0]] == 'rgba(253,208,162,0.9)' || colorData[sortedData[year][i][0]] == 'rgba(253,174,107,0.9)'){
            $("#rankingList").append("<h3 id=" + sortedData[year][i][0] + "><p class='rankNumber' style='text-align: center; float: left; width: 35px; color: black; background-color: " + colorData[sortedData[year][i][0]] + "'>" + parseInt(i + 1) + "<\p> <p class = 'country'>" + sortedData[year][i][1] + "</p> <p class='perc'>" + parseFloat(parseFloat(sortedData[year][i][2]).toFixed(2)) + "\%</p></h3> <div>" + content + "</div>");
        } else {
             $("#rankingList").append("<h3 id=" + sortedData[year][i][0] + "><p class='rankNumber'  style='text-align: center; float: left; width: 35px; color: white; background-color: " + colorData[sortedData[year][i][0]] + "'>" + parseInt(i + 1) + "<\p> <p class = 'country'>" + sortedData[year][i][1] + "</p> <p class='perc'>" + "0" + "\%</p></h3> <div>" + content + "</div>");
        }
    }
    $('#rankingList').accordion("refresh");


}