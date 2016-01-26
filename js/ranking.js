/**
 * Created by s150834 on 25-1-2016.
 */

//Variables
var selected_year_from_list = 1991;





$(document).ready(function() {//when the DOM has loaded

    $('#yearMenu li').click(function() {//add event listener to dropdown menu
        $('#yearMenu li').removeClass('yearSelected');
        $(this).addClass('yearSelected');
        selected_year_from_list = $('.yearSelected').text();
        $('#yearButton').text(selected_year_from_list);
        //Update Map
        year = selected_year_from_list;
        updateMap(selected_year_from_list);
        //UpdateRanking

        //UpdateIndexChart
    });

});