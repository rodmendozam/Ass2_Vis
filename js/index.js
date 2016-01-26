/**
 * Created by s150834 on 26-1-2016.
 */

//variables
var dataCurrent = [];
var data = [{
    "sale": "75.5",
    "year": "1990",
    "countryName": "USA"
}, {
    "sale": "0",
    "year": "1991",
    "countryName": "USA"
}, {
    "sale": "45.6",
    "year": "1992",
    "countryName": "USA"
}, {
    "sale": "80.0",
    "year": "1993",
    "countryName": "USA"
}, {
    "sale": "20.5",
    "year": "1994",
    "countryName": "USA"
}, {
    "sale": "33.3",
    "year": "1995",
    "countryName": "USA"
},{
    "sale": "5.6",
    "year": "1996",
    "countryName": "USA"
}, {
    "sale": "16.7",
    "year": "1997",
    "countryName": "USA"
}, {
    "sale": "19.2",
    "year": "1998",
    "countryName": "USA"
}, {
    "sale": "88.4",
    "year": "1999",
    "countryName": "USA"
}, {
    "sale": "91.4",
    "year": "2000",
    "countryName": "USA"
}, {
    "sale": "33.1",
    "year": "2001",
    "countryName": "USA"
}, {
    "sale": "42.5",
    "year": "2002",
    "countryName": "USA"
}, {
    "sale": "32.32",
    "year": "2003",
    "countryName": "USA"
}, {
    "sale": "56.4",
    "year": "2004",
    "countryName": "USA"
}, {
    "sale": "47.1",
    "year": "2005",
    "countryName": "USA"
}, {
    "sale": "67.5",
    "year": "2006",
    "countryName": "USA"
}, {
    "sale": "31.2",
    "year": "2007",
    "countryName": "USA"
}, {
    "sale": "11.8",
    "year": "2008",
    "countryName": "USA"
}, {
    "sale": "21.5",
    "year": "2009",
    "countryName": "USA"
}, {
    "sale": "84.8",
    "year": "2010",
    "countryName": "USA"
}, {
    "sale": "75.0",
    "year": "2011",
    "countryName": "USA"
}];



//DOM loaded
$(document).ready(function() {//when the DOM has loaded
    var vis = d3.select("#index_visualisation"),
    WIDTH = 1280,
    HEIGHT = 315,
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

    vis.append("svg:g")
        .attr("class","axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class","axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    //d3 api method to create line that depends on the year and scale
    var lineGen = d3.svg.line()
    .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
        return yScale(d.sale);
    })
    //.interpolate("linear");


    //Add paths
    //vis.append('svg:path')
    //  .attr('d', lineGen(data))
    //  .attr('stroke', 'green')
    //  .attr('stroke-width', 1)
    //  .attr('fill', 'none');


    addLineToIndexChart(data, 'blue');




    //FUNCTIONS
    function addLineToIndexChart(data_structure, colorLine){
        vis.append('svg:path')
          .attr('d', lineGen(data_structure))
          .attr('stroke', colorLine)
          .attr('stroke-width', 1)
          .attr('fill', 'none');
        return 1;
    }
    function joinDataToDataCurrent(data_obj){//get data onClick from map and add it to data current
        dataCurrent.push(data_obj);
    }
});





























