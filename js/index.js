/**
 * Created by s150834 on 26-1-2016.
 */
/*useful link http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js-part-2--cms-22973*/
/*useful link  */
//variables
var manualAxis = false;
var minAxis = 0;
var maxAxis = 0.2;
var tester;
var colorBrewerQualitive = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"];
var dataCurrent = [];
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
var vis,lineGen,dataGroup, CircleGen;
var colorss = ["blue","red"];

//FUNCTIONS
function joinDataToDataCurrent(data_obj){//get data onClick from map and add it to data current FIX IS NOT CONCAT
        dataCurrent = dataCurrent.concat(data_obj);
}
function deleteCountryFromData(country){
    var tempData = [];
    dataCurrent.forEach(function(element, index, array){
        //console.log(element.year);
        if(element.country != country)
            tempData.push(element);
    });
    dataCurrent = tempData;
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
            [ d3.min(dataCurrent, function(d) {return d.perc;}),
            d3.max(dataCurrent, function(d) {return +d.perc;})]);
        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
        vis.append("svg:g")
            .attr("class","axisY")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);
    }


    //console.log(d3.min(dataCurrent, function(d) {return d.perc;}));
    //console.log(d3.max(dataCurrent, function(d) {return +d.perc;}));



}
function initIndex(){
    dataCurrent = [];
    vis = d3.select("#index_visualisation"),
    WIDTH = 1280,
    HEIGHT = 350,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1990,2011]),
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([-50,100]),
    xAxis = d3.svg.axis()
        .scale(xScale),
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
    dataGroup = d3.nest()
            .key(function(d) {
                return d.country;
            })
            .entries( dataCurrent );

    //Each data to a line and draw
    dataGroup.forEach(function(d, i) {
        vis.append('svg:path')
            .attr('d', lineGen(d.values))
            .attr("class", "line")
            .attr('stroke', colorBrewerQualitive[i])
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        var colorForCircleIndex = i;
        for (var i = 0, len = d.values.length; i < len; i++){
            vis.append('svg:circle')
            //.attr('d', CircleGen(d.values))
            .attr("cx", xScale(d.values[i].year))
            .attr("cy", yScale(d.values[i].perc))
            .attr("r", 4)
                .attr('class','circle')
            .style("fill", colorBrewerQualitive[colorForCircleIndex]);
        }

        //tester = d;
    });

}
function mapCountryClicked(mapClickedArray){
    //if already in data don't add, else add
    var BreakException= {};
    var existInCurrentData = false;
    try{
        dataCurrent.forEach(function(d,i){
            if(mapClickedArray[0].country == d.country)
                throw BreakException;
        });
    }catch(e){
        existInCurrentData = true;
    }
    if(!existInCurrentData){
        joinDataToDataCurrent(mapClickedArray);
        //Call for an update
        updateIndex();
    }
}
function cleanAllLinesFromIndexChart(){
    d3.selectAll("path.line").remove();
    d3.selectAll(".circle").remove();
    dataCurrent = [];
}
//DOM loaded
$(document).ready(function() {//when the DOM has loaded

    initIndex();

});





























