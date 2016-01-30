/**
 * Created by s150834 on 26-1-2016.
 */
/*useful link  tutorial of d3         http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js-part-2--cms-22973*/
/*useful link  contrasting colors alg http://godsnotwheregodsnot.blogspot.ru/2012/09/color-distribution-methodology.html*/

//variables

var currentGraphicMethod = 'Percentage Chart';//Initial Mode
var currentIndexYear = '1990';//Initial Index year
var dataIndexed = []; //Index data form
var minValueFromDataGroup = 0, maxValueFromDataGroup = 0;
var newElementForLabel;
var labelBoxSelector = ['#labelSectorLeft','#labelSectorCenter','#labelSectorRight'];
var currentPositionlabelBox = 0;
var manualAxis = false;
var minAxis = 0;
var maxAxis = 0.2;
var yPartitions = 10;
var tester;
var colorBrewerQualitive = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e85ebe","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#dd6937","#b15928",
                            "#009bff","#ffb167","#a5ffd2","#a75740","#5fad4e","#005f39","#ff6e41","#b500ff","#7544b1","#98ff52","#008f9c","#620e00",
                            "#ffe502","#00ffc6","#deff74","#43002c","#bb8800","#968ae8","#be9970","#91d0cb","#0e4ca1","#788231","#e56ffe","#004754",
                            "#01d0ff","#ff74a3","#c28c9f","#001544","#9e008e","#00b917","#bdd393","#263400","#bdc6ff","#683d3b","#00ae7e","#a42400",
                            "#ff0056","#85a900","#7e2dd2","#fe8900","#ff029d","#6a826c","#ff937e","#d5ff00","#0076ff","#90fb92","#774d00","#95003a",
                            "#010067","#006401","#ffdb66","#ffa6fe","#7a4782","#000000"];
var dataPercWithoutGroups = [];
var vis,lineGen,dataPercWithGroups;
var countryWithIndexYearCero = '';



d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

//FUNCTIONS
function joinDataTodataPercWithoutGroups(data_obj){//get data onClick from map and add it to data current FIX IS NOT CONCAT
        dataPercWithoutGroups = dataPercWithoutGroups.concat(data_obj);
}
function deleteCountryFromData(country){
    var tempData = [];
    dataPercWithoutGroups.forEach(function(element, index, array){
        //console.log(element.year);
        if(element.country != country)
            tempData.push(element);
    });
    dataPercWithoutGroups = tempData;
}
function update_y_axis(){//

    if(manualAxis){
        d3.select("g.axisY").remove();//remove axis
        //add new axis
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
            [ minAxis, maxAxis]);
        yAxis = d3.svg.axis()
            .scale(yScale).ticks(yPartitions)
            .orient("left");
        vis.append("svg:g")
            .attr("class","axisY")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

        //grid
        d3.selectAll("line.y").remove();//remove axis
        vis.selectAll("line.y")
          .data(yScale.ticks(yPartitions))
          .enter().append("line")
          .attr("class", "y")
          .attr("x1", xScale(1990))
          .attr("x2", xScale(2011))
          .attr("y1", yScale)
          .attr("y2", yScale)
          .style("stroke", "#ccc");
    }else{//get max value and lowest and sets a scale
        d3.select("g.axisY").remove();//remove axis
        //add new axis
        //yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
        //    [ d3.min(dataPercWithoutGroups, function(d) {return +d.perc;}),
        //    d3.max(dataPercWithoutGroups, function(d) {return +d.perc;})]);

        //max and min from data with groups useful for index and perc chart...the above one orks only for perc chart
        d3.select("g.axisY").remove();//remove axis
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
            [ d3.min(dataPercWithGroups, function(d) {
                return d3.min(d.values, function(e){
                    //console.log(e);
                   return +e.perc;
                });
            }),
            d3.max(dataPercWithGroups, function(d) {

                //console.log(d);

                return d3.max(d.values, function(e){
                    //console.log(e);
                   return +e.perc;
                });


            })]);


        yAxis = d3.svg.axis()
            .scale(yScale).ticks(yPartitions)
            .orient("left");
        vis.append("svg:g")
            .attr("class","axisY")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);


        //grid
        d3.selectAll("line.y").remove();//remove axis
        vis.selectAll("line.y")
          .data(yScale.ticks(yPartitions))
          .enter().append("line")
          .attr("class", "y")
          .attr("x1", xScale(1990))
          .attr("x2", xScale(2011))
          .attr("y1", yScale)
          .attr("y2", yScale)
          .style("stroke", "#ccc");
    }
    d3.selectAll('line.x').style('stroke', '#ccc');
    if(currentGraphicMethod == 'Index Chart'){//paint red the index year bar
        var yearToPaintRed = currentIndexYear - 1988;//if you rest 1988 you get the first bar number 2 and so on
        d3.selectAll('line.x:nth-child('+yearToPaintRed+')').style('stroke', '#d32935');
    }

}
function initIndex(){
    dataPercWithoutGroups = [];
    vis = d3.select("#index_visualisation"),
    WIDTH = 1280,
    HEIGHT = 440,
    MARGINS = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 50
    },
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1990,2011]),//Define Scales
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,100]),
    //yScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,100]),
    xAxis = d3.svg.axis()
        .scale(xScale).tickFormat(d3.format("d")).ticks(22);
    yAxis = d3.svg.axis()
        .scale(yScale).ticks(yPartitions)
        .orient("left");
    
    //Order the axis
    vis.append("svg:g")
        .attr("class","axisX")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class","axisY")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    //Create Background grid
    vis.selectAll("line.x")
      .data(xScale.ticks(22))
      .enter().append("line")
      .attr("class", "x")
      .attr("x1", xScale)
      .attr("x2", xScale)
      .attr("y1", yScale(0))
      .attr("y2", yScale(100))
      .style("stroke", "#ccc");
    // Draw Y-axis grid lines
    vis.selectAll("line.y")
      .data(yScale.ticks(yPartitions))
      .enter().append("line")
      .attr("class", "y")
      .attr("x1", xScale(1990))
      .attr("x2", xScale(2011))
      .attr("y1", yScale)
      .attr("y2", yScale)
          .style("stroke", "#ccc");






    //d3 api method to create line that depends on the year and percentage
    lineGen = d3.svg.line()
    .defined(function(d) {
                //var check = d.perc == '' ? 'empty' : 'has some';
                //console.log(check);
                //if(yScale(d.perc) > yScale(minAxis)){
                //    console.log('yScale on perc: '+ yScale(d.perc) + ' yScale on 0: ' + yScale(minAxis));
                //    return false;
                //}

                return d.perc!== '';
            })
    .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
        return yScale(d.perc);
    })
    //.interpolate("linear");
}
function updateIndex(){
    d3.selectAll("path.line").remove();
    d3.selectAll(".circle").remove();

    //SORT DATA BY KEY
    dataPercWithGroups = d3.nest()
            .key(function(d) {
                return d.country;
            })
            .entries( dataPercWithoutGroups );

    //TRANSFORM DATAPERCWITHGROUPS PERC VALUES INTO INDEX VALUES
    if(currentGraphicMethod == 'Index Chart'){//CHANGE DATA IF INDEX CHART MODE IS ON
        //dataPercWithGroups = $.extend(true, {}, transformDataGroupIntoIndexGroup(dataPercWithGroups,currentIndexYear));//makes a copy of the data and not a copy by reference only
        var dataManipulated = transformDataGroupIntoIndexGroup(dataPercWithGroups,parseInt(currentIndexYear));
        //dataPercWithGroups = $.extend(true, {}, dataManipulated);
        //dataManipulated = d3.nest().key(function(d){ return d.country; }).entries(dataManipulated);
        //console.log(dataManipulated);
        dataPercWithGroups = dataManipulated;
        //console.log(dataPercWithGroups);
    }
    //UPDATE Y AXIS
    update_y_axis();
    //EACH DATA TO A LINE AND DRAW
    dataPercWithGroups.forEach(function(d, i) {
        var randomColorSelector = Math.floor(Math.random()*16777215).toString(16);
        vis.append('svg:path')
            .attr('d', lineGen(d.values))
            .attr("class", "line")
            .attr('stroke', (i < dataPercWithGroups.length ? colorBrewerQualitive[i] : randomColorSelector ) )//assign color from list if too many colors already choosen create a random
            .attr('id', 'line_' + d.key.replace(/\s/g, ''))
            .attr('stroke-width', 4)
            .attr('fill', 'none');
        var colorForCircleIndex = i;
        for (var i = 0, len = d.values.length; i < len; i++){

            if(d.values[i].perc == ''){

            }else{
                vis.append('svg:circle')
                    //.attr('d', CircleGen(d.values))
                    .attr("cx", xScale(d.values[i].year))
                    .attr("cy", yScale(d.values[i].perc))
                    .attr("r", 4)
                    .attr('class','circle' + ' circle_' + d.key.replace(/\s/g, ''))
                    //.attr('class','circle_' + d.key)
                    .style("fill", (colorForCircleIndex < dataPercWithGroups.length ? colorBrewerQualitive[colorForCircleIndex] : randomColorSelector ));
            }

        }

        //tester = d;
    });

    //ADD LABELS
    d3.selectAll("text.legend").remove();
    lSpace = WIDTH/dataPercWithGroups.length;

    //Delete all childs from the labels and draw them
    $(labelBoxSelector[0]).empty();
    $(labelBoxSelector[1]).empty();
    $(labelBoxSelector[2]).empty();
    dataPercWithGroups.forEach(function(d,i){
        var trimKey = d.key.replace(/\s/g, '');//delete white spaces
        var colorFromStroke = d3.select("#line_" + trimKey).attr('stroke');

        //Add labels to columns in jquery
        newElementForLabel = $("<div>"+ d.key +"</div>");
        newElementForLabel.css({
            'color' : colorFromStroke,
            'margin-top' : '5px'
        });
        newElementForLabel.click(function(){
            d3.selectAll(".line").classed("strokeGray", true);
            d3.selectAll(".circle").classed("fillGray", true);
            //remove gray from selected line
            d3.select("#line_" + trimKey).classed("strokeGray", false);
            d3.selectAll(".circle_"+ trimKey).classed("fillGray", false);
            //paint red the selected line
            d3.select("#line_" + trimKey).classed("strongHighlightStroke", true);
            d3.selectAll(".circle_"+ trimKey).classed("strongHighlightFill", true);
            d3.select("#line_" + trimKey).moveToFront();//bring to the front svg
        });
        $(labelBoxSelector[currentPositionlabelBox]).append(newElementForLabel);
        currentPositionlabelBox = currentPositionlabelBox == 2 ? 0 : currentPositionlabelBox = currentPositionlabelBox + 1;
        //console.log(currentPositionlabelBox);

    });
        currentPositionlabelBox = 0;//reset counter of labels

}
function mapCountryClicked(mapClickedArray){
    //if already in data don't add, else add
    var BreakException= {};
    var existInCurrentData = false;
    try{
        dataPercWithoutGroups.forEach(function(d,i){
            if(mapClickedArray[0].country == d.country)
                throw BreakException;
        });
    }catch(e){
        existInCurrentData = true;
    }
    if(!existInCurrentData){
        joinDataTodataPercWithoutGroups(mapClickedArray);
        //Call for an update
        updateIndex();
    }
}
function cleanAllLinesFromIndexChart(){
    d3.selectAll("path.line").remove();
    d3.selectAll(".circle").remove();
    //Delete all childs from the labels
    $(labelBoxSelector[0]).empty();
    $(labelBoxSelector[1]).empty();
    $(labelBoxSelector[2]).empty();

    dataPercWithoutGroups = [];
}
function addLabels(){
    //lSpace = WIDTH/dataPercWithGroups.length;

}
function setGraphTitle(modeTitle){//Adds or changes the title depending on graphic method
    //console.log(modeTitle);
    //vis.append("text")
    //        .attr("x", xScale(50))
    //        .attr("y", yScale(50))
    //        .attr("fill",'black')
    //        .attr("class", "legendTitle")
    //        .text('Title');
}

//DOM loaded
$(document).ready(function() {//when the DOM has loaded
    initIndex();//Initialize map

    //Form handler
    $('#axisMethod').change(function(){
       var yAxisStatus = $('#axisMethod option:selected' ).text() ;
        if(yAxisStatus == 'Manual'){//Handle Manual
            manualAxis = true;
            //Activate Controlers
            $('#minInputValue').prop('disabled', false);
            $('#maxInputValue').prop('disabled', false);
            //$('#buttonYaxis').prop('disabled', false);
        }
        else{//Handle Auto
            manualAxis = false;
            $('#minInputValue').prop('disabled', true);
            $('#maxInputValue').prop('disabled', true);
            //$('#buttonYaxis').prop('disabled', true);
        }
    });
    $("#buttonYaxis").click( function(){
        if(!manualAxis) {//automatic button handler
            //update_y_axis();
            updateIndex();
        }else{//manual  button handler
            minAxis = +$('#minInputValue').val();
            maxAxis = +$('#maxInputValue').val();
            //console.log("Min: " + minAxis + " Max: " + maxAxis);
            //update_y_axis();
            updateIndex();
        }

    });
    $("#graphMethod").change( function(){//Graphic Mode changed
       setGraphTitle($("#graphMethod option:selected").text())
    });

    $("#buttonClear").click( function(){//Graphic Mode changed
       cleanAllLinesFromIndexChart();
    });

    $("#rangeMethodDropmenu").change(function(){
        updateMap(selected_year_from_list);
    });
    $('#partitionLevel').change(function(){
        //console.log($('#partitionLevel option:selected' ).text());
        yPartitions = parseInt($('#partitionLevel option:selected' ).text());
    });




    //INDEX HANDLER BUTTONS
    $('#graphMethod').change(function(){//Handle the graphic method
        currentGraphicMethod = $('#graphMethod option:selected' ).text() ;//get graphic mode text
        currentIndexYear = $('#indexYearMenu option:selected').text(); //get graphic index year text
        if(currentGraphicMethod == 'Percentage Chart') {//Block Index dropmenu
            $('#indexYearMenu').prop('disabled', true);
            currentGraphicMethod = 'Percentage Chart';
        }
        else if(currentGraphicMethod == 'Index Chart'){//First time updating index chart
            $('#indexYearMenu').prop('disabled', false);//
            currentGraphicMethod = 'Index Chart';
            currentIndexYear = $('#indexYearMenu option:selected').text(); //get graphic index year text
        }
    });
    $('#indexYearMenu').change(function() {//Handle the graphic method
        //d3.select('line.x:nth-child(24)').style("stroke", "#ccc");
        currentIndexYear = $('#indexYearMenu option:selected').text(); //get graphic index year text
        //update data with index value
        //paint index line
    });

});


function transformDataGroupIntoIndexGroup(dataToTransform, yearAsIndex){
    countryWithIndexYearCero = ''
    var tempData = $.extend(true, {}, dataToTransform);
    $.each(tempData, function(index, val){
        var indexYearPercValue = getIndexYearPerc(yearAsIndex, val.values);//Find perc value from the year given
        //console.log(tempData);
        countryWithIndexYearCero = indexYearPercValue == 0 ? countryWithIndexYearCero = countryWithIndexYearCero + ', ' + val.key: countryWithIndexYearCero;
        $.each(val.values, function(index, val){
            if(indexYearPercValue == 0){
                val.perc = '';
                //countryWithIndexYearCero = countryWithIndexYearCero + ', ';
            }
            else if(val.perc != '')
                val.perc = (val.perc - indexYearPercValue) / indexYearPercValue;
        });
    });
    //console.log('Data to transform:')
    //console.log(dataToTransform);
    //console.log('Data processed:')
    //console.log(tempData);
    //console.log('Data try to change structure:')
    var myArray = [];
    $.each(tempData,function(i,d){
       myArray.push(d);
    });
    if(countryWithIndexYearCero != '')
        countryWithIndexYearCero = (countryWithIndexYearCero + ' miss index year value').substr(1);
    $('#labelTextIndexCountriesCero').text(countryWithIndexYearCero);
    return myArray;

}
function getIndexYearPerc(yearToFind, arraySet){
    var element = 0.0;
    $.each(arraySet,function(index, val){
        //console.log('Perc primero' + val.perc);
        if(parseInt(val.year) == parseInt(yearToFind)){
            //console.log('Perc adentro del if' + val.perc);
            element = val.perc == "" ? 0.0 : val.perc;
            return;
        }
    });
    return element;
}














