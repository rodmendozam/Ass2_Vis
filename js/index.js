/**
 * Created by s150834 on 26-1-2016.
 */
/*useful link  tutorial of d3         http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js-part-2--cms-22973*/
/*useful link  contrasting colors alg http://godsnotwheregodsnot.blogspot.ru/2012/09/color-distribution-methodology.html*/
//variables
var manualAxis = false;
var minAxis = 0;
var maxAxis = 0.2;
var tester;
var colorBrewerQualitive = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e85ebe","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#dd6937","#b15928",
                            "#009bff","#ffb167","#a5ffd2","#a75740","#5fad4e","#005f39","#ff6e41","#b500ff","#7544b1","#98ff52","#008f9c","#620e00",
                            "#ffe502","#00ffc6","#deff74","#43002c","#bb8800","#968ae8","#be9970","#91d0cb","#0e4ca1","#788231","#e56ffe","#004754",
                            "#01d0ff","#ff74a3","#c28c9f","#001544","#9e008e","#00b917","#bdd393","#263400","#bdc6ff","#683d3b","#00ae7e","#a42400",
                            "#ff0056","#85a900","#7e2dd2","#fe8900","#ff029d","#6a826c","#ff937e","#d5ff00","#0076ff","#90fb92","#774d00","#95003a",
                            "#010067","#006401","#ffdb66","#ffa6fe","#7a4782","#000000"];
var dataPercWithoutGroups = [];
var vis,lineGen,dataPercWithGroups;
var dataIndexWithoutGroups = [];

//Data for testing dummy
var data = [{
    "perc": "75.5",
    "year": "1990",
    "country": "USA"
}, {
    "perc": "0",
    "year": "1991",
    "country": "USA"
}, {
    "perc": "45.6",
    "year": "1992",
    "country": "USA"
}, {
    "perc": "80.0",
    "year": "1993",
    "country": "USA"
}, {
    "perc": "20.5",
    "year": "1994",
    "country": "USA"
}, {
    "perc": "33.3",
    "year": "1995",
    "country": "USA"
},{
    "perc": "5.6",
    "year": "1996",
    "country": "USA"
}, {
    "perc": "16.7",
    "year": "1997",
    "country": "USA"
}, {
    "perc": "19.2",
    "year": "1998",
    "country": "USA"
}, {
    "perc": "88.4",
    "year": "1999",
    "country": "USA"
}, {
    "perc": "91.4",
    "year": "2000",
    "country": "USA"
}, {
    "perc": "33.1",
    "year": "2001",
    "country": "USA"
}, {
    "perc": "42.5",
    "year": "2002",
    "country": "USA"
}, {
    "perc": "32.32",
    "year": "2003",
    "country": "USA"
}, {
    "perc": "56.4",
    "year": "2004",
    "country": "USA"
}, {
    "perc": "47.1",
    "year": "2005",
    "country": "USA"
}, {
    "perc": "67.5",
    "year": "2006",
    "country": "USA"
}, {
    "perc": "31.2",
    "year": "2007",
    "country": "USA"
}, {
    "perc": "11.8",
    "year": "2008",
    "country": "USA"
}, {
    "perc": "21.5",
    "year": "2009",
    "country": "USA"
}, {
    "perc": "84.8",
    "year": "2010",
    "country": "USA"
}, {
    "perc": "75.0",
    "year": "2011",
    "country": "USA"
}];
var data2 = [{
    "perc": "45.5",
    "year": "1990",
    "country": "MEX"
}, {
    "perc": "0",
    "year": "1991",
    "country": "MEX"
}, {
    "perc": "25.6",
    "year": "1992",
    "country": "MEX"
}, {
    "perc": "70.0",
    "year": "1993",
    "country": "MEX"
}, {
    "perc": "10.5",
    "year": "1994",
    "country": "MEX"
}, {
    "perc": "43.3",
    "year": "1995",
    "country": "MEX"
},{
    "perc": "15.6",
    "year": "1996",
    "country": "MEX"
}, {
    "perc": "36.7",
    "year": "1997",
    "country": "MEX"
}, {
    "perc": "79.2",
    "year": "1998",
    "country": "MEX"
}, {
    "perc": "78.4",
    "year": "1999",
    "country": "MEX"
}, {
    "perc": "91.4",
    "year": "2000",
    "country": "MEX"
}, {
    "perc": "23.1",
    "year": "2001",
    "country": "MEX"
}, {
    "perc": "42.5",
    "year": "2002",
    "country": "MEX"
}, {
    "perc": "32.32",
    "year": "2003",
    "country": "MEX"
}, {
    "perc": "66.4",
    "year": "2004",
    "country": "MEX"
}, {
    "perc": "47.1",
    "year": "2005",
    "country": "MEX"
}, {
    "perc": "87.5",
    "year": "2006",
    "country": "MEX"
}, {
    "perc": "31.2",
    "year": "2007",
    "country": "MEX"
}, {
    "perc": "11.8",
    "year": "2008",
    "country": "MEX"
}, {
    "perc": "21.5",
    "year": "2009",
    "country": "MEX"
}, {
    "perc": "84.8",
    "year": "2010",
    "country": "MEX"
}, {
    "perc": "75.0",
    "year": "2011",
    "country": "MEX"
}];
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
            .scale(yScale)
            .orient("left");
        vis.append("svg:g")
            .attr("class","axisY")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);
    }else{//get max value and lowest and sets a scale
        d3.select("g.axisY").remove();//remove axis
        //add new axis
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
            [ d3.min(dataPercWithoutGroups, function(d) {return d.perc;}),
            d3.max(dataPercWithoutGroups, function(d) {return +d.perc;})]);
        yAxis = d3.svg.axis()
            .scale(yScale).ticks(10)
            .orient("left");
        vis.append("svg:g")
            .attr("class","axisY")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);


        //grid
        d3.selectAll("line.y").remove();//remove axis
        vis.selectAll("line.y")
          .data(yScale.ticks())
          .enter().append("line")
          .attr("class", "y")
          .attr("x1", xScale(1990))
          .attr("x2", xScale(2011))
          .attr("y1", yScale)
          .attr("y2", yScale)
          .style("stroke", "#ccc");
    }


    //console.log(d3.min(dataPercWithoutGroups, function(d) {return d.perc;}));
    //console.log(d3.max(dataPercWithoutGroups, function(d) {return +d.perc;}));



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
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([-50,100]),
    xAxis = d3.svg.axis()
        .scale(xScale).ticks(22);
    yAxis = d3.svg.axis()
        .scale(yScale)
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
      .attr("y1", yScale(-50))
      .attr("y2", yScale(100))
      .style("stroke", "#ccc");
    // Draw Y-axis grid lines
    vis.selectAll("line.y")
      .data(yScale.ticks(8))
      .enter().append("line")
      .attr("class", "y")
      .attr("x1", xScale(1990))
      .attr("x2", xScale(2011))
      .attr("y1", yScale)
      .attr("y2", yScale)
      .style("stroke", "#ccc");



    //d3 api method to create line that depends on the year and percentage
    lineGen = d3.svg.line()
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
    update_y_axis();
    //Sort data by key
    dataPercWithGroups = d3.nest()
            .key(function(d) {
                return d.country;
            })
            .entries( dataPercWithoutGroups );

    //Each data to a line and draw
    dataPercWithGroups.forEach(function(d, i) {
        //console.log("len is: "+dataPercWithGroups.length);
        //console.log(i);
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
            vis.append('svg:circle')
            //.attr('d', CircleGen(d.values))
            .attr("cx", xScale(d.values[i].year))
            .attr("cy", yScale(d.values[i].perc))
            .attr("r", 4)
            .attr('class','circle' + ' circle_' + d.key.replace(/\s/g, ''))
            //.attr('class','circle_' + d.key)
            .style("fill", (colorForCircleIndex < dataPercWithGroups.length ? colorBrewerQualitive[colorForCircleIndex] : randomColorSelector ));
        }

        //tester = d;
    });

    //add labels
    d3.selectAll("text.legend").remove();
    lSpace = WIDTH/dataPercWithGroups.length;
    dataPercWithGroups.forEach(function(d,i){
        var trimKey = d.key.replace(/\s/g, '');//delete white spaces
        var colorFromStroke = d3.select("#line_" + trimKey).attr('stroke');
        vis.append("text")
            .attr("x", (lSpace / 2) + i * lSpace)
            .attr("y", HEIGHT)
            .attr("fill",colorFromStroke)
            .attr("class", "legend")
            //.style("fill", "black")
            .on('click', function() {
                //var active = d.active ? false : true;
                //var opacity = active ? 0 : 1;

                //console.log(d3.select("#line_" + trimKey).attr('stroke'));
                //paint all lines gray
                d3.selectAll(".line").classed("strokeGray", true);
                d3.selectAll(".circle").classed("fillGray", true);

                //remove gray from selected line
                d3.select("#line_" + trimKey).classed("strokeGray", false);
                d3.selectAll(".circle_"+ trimKey).classed("fillGray", false);


                //paint red the selected line
                d3.select("#line_" + trimKey).classed("strongHighlightStroke", true);
                d3.selectAll(".circle_"+ trimKey).classed("strongHighlightFill", true);
                d3.select("#line_" + trimKey).moveToFront();//bring to the front svg
                //d3.select(".circle_"+ trimKey).moveToFront();//not working

            })
            .text(d.key);
            //console.log(d.key);
    });

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
        if(!manualAxis) {//automatic botton handler
            //update_y_axis();
            updateIndex();
        }else{//manual  botton handler
            minAxis = +$('#minInputValue').val();
            maxAxis = +$('#maxInputValue').val();
            console.log("Min: " + minAxis + " Max: " + maxAxis);
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
});





























