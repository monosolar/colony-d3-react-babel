
///////////////////////////////////////////////////////////////////////////
////////////// Initiate SVG and create hexagon centers ////////////////////
///////////////////////////////////////////////////////////////////////////

//Function to call when you mouseover a node
function mover(d) {
  var el = d3.select(this)
		.transition()
		.duration(1000)		  
		.style("fill", "#000000")
		.style("stroke", "#000000")
		
		;
}

//Mouseout function
function mout(d) { 
	var el = d3.select(this)
	   .transition()
	   .duration(1000)
	   
	   ;
};

function mclick(d) { 
	var el = d3.select(this);
	   
	var col = el[0][0].__data__.i
	var row = el[0][0].__data__.j
		
	
	
	var nextEl = d3.select(svgArray[0][0])
	   .style("fill", "#000000")
	   ;

    console.log('►',svgArray[0])
	
};



//svg sizes and margins
var margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
};

var width = 350;
var height = 350;

//The number of columns and rows of the heatmap
var MapColumns = 30,
	MapRows = 20;
	
//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
			height/((MapRows + 1/3) * 1.5)]);

//Set the new height and width of the SVG based on the max possible
width = MapColumns*hexRadius*Math.sqrt(3);
heigth = MapRows*1.5*hexRadius+0.5*hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin()
    	       .radius(hexRadius);

//Calculate the center positions of each hexagon	
var points = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
    }//for j
}//for i

//Create SVG element
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

///////////////////////////////////////////////////////////////////////////
////////////////////// Draw hexagons and color them ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Start drawing the hexagons
var svgArray = svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
		return "M" + d.x + "," + d.y + hexbin.hexagon();
	})
	.attr("E", function (i) {
		return "C=" + i;
	})
    .attr("stroke", function (d,i) {
		return "#ddd";
	})
    .attr("stroke-width", "1px")
    .style("fill", function (d,i) {
		return "#fff";
	})
	//.on("mouseover", mover)
	//.on("mouseout", mout)
	.on("click", mclick)
	;