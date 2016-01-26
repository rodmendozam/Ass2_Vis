/**
 * Created by s150834 on 25-1-2016.
 */

//Variables
var selected_year_from_list = 2011;

$(document).ready(function() {//when the DOM has loaded

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