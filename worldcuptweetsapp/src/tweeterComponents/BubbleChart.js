 import React, { Component } from 'react';
import * as d3 from 'd3';
 
class BubbleChart extends Component {
    
    componentDidMount(){
    	this.drawChart();
    }
    
    drawChart(){
    	var data = this.props.data;
    	
		var svg = d3.select("svg")
			 .attr("width", 960)
			 .attr("height", 960);
		var width = +svg.attr("width"),
			height = +svg.attr("height");

		var tooltip = d3.select("#retweets")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden")
				.style("color", "white")
				.style("padding", "8px")
				.style("background-color", "rgba(0, 0, 0, 0.75)")
				.style("border-radius", "6px")
				.style("font", "12px sans-serif")
				.text("tooltip");
				
		var pack = d3.pack()
			.size([width-150, height])
			.padding(1.5);	  
		 
		  var color = d3.scaleOrdinal()
		  .domain(data.map(function(d){ return d.id;}))
		  .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6',
		  '#ffe9a8','#b9bfe3','#fddaec','#cccccc']);
		  
		  var root = d3.hierarchy({children: data})
			  .sum(function(d) { return d.retweets; })

		  var node = svg.selectAll(".node")
			.data(pack(root).leaves())
			.enter().append("g")
			  .attr("class", "node")
			  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		 
		  
		  node.append("circle")
			  .attr("id", function(d) { return d.id; })
			  .attr("r", function(d) {  return d.r; })
			  .style("fill", function(d) { return color(d.data.id); })
			  .on("mouseover", function(d) {
				                                tooltip.text('Id : '+d.data.id+', Retweets : '+ d.data.retweets +", text : "+d.data.text);
				                                tooltip.style("visibility", "visible");
				                                })					
			.on("mousemove", function() {
					node.style("fill","#00ACED")
				    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
			})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
			
			
    }
    
    render() {
        return (
        	<div id="retweets">
		    	<div className="alert alert-info text-center">
		    		<p>
		    			<span className="glyphicon glyphicon-warning-sign"></span>
		    			Chaque boule représente un tweet. Le rayon d une boule est proportionnel au nombre de retweet de ce tweet.
		    		</p>
				</div>
				<svg></svg>		
			</div>
        );
    }
}
 
export default BubbleChart;
