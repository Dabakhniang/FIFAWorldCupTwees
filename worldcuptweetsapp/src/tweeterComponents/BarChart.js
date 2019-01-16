import React, { Component } from 'react';
import * as d3 from 'd3';
var Chart = require("chart.js");

class BarChart extends Component{

	getDays(liste){
		var result = [];
		for (var d in liste){
			result.push(liste[d]);
		}	 
		console.log(result);	
		return result;
	}
	
	getDailyNumberOfTweets(liste){
		var result = [];
		for (var d in liste){
			result.push(liste[d].number);
		}	 
		return result;
	}

	componentDidMount(){
    	this.drawChart();
    }
    
	drawChart(){
		let root = document.getElementById("barchart");
		let ctx = root.getContext("2d");
		
		const dailyTweets = this.props.data; 
		
		let barChart = new Chart(ctx, {
			type : 'bar',
			data : {
				labels : this.getDays(dailyTweets).reverse(),
				datasets : [
					{
						label : "Nombre de tweets",
						backgroundColor : "#00ACED",
						data : this.getDailyNumberOfTweets(dailyTweets).reverse()
					}
				]
			
			},
			options : {}
		});
	}
	
    render() {
        return (
        	<canvas id="barchart">
			</canvas>
        );
    }

}

export default BarChart;
