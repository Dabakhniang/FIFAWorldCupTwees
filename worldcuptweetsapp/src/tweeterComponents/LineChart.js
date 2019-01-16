 import React, { Component } from 'react';
var Chart = require("chart.js");
 
class LineChart extends Component {

    getDays(liste){
		var result = [];	
		for (var d in liste){
			result.push(d);
		}	 
		return result;
	}
	
	getDailyNumberOfEmoticons(liste){
		var result = [];
		for (var d in liste){
			result.push(liste[d].value);
		}	 
		console.log(result	);
		return result;
	}
	
    componentDidMount(){
    	this.drawChart();
    }
    
	drawChart(){
		
		let root = document.getElementById("emoticones");
		let ctx = root.getContext("2d");
		
		const dailyEmoticons = this.props.data; 
		
		let barChart = new Chart(ctx, {
			type : 'line',
			data : {
				labels : this.getDays(dailyEmoticons).reverse(),
				datasets : [
					{
						label : "Nombre d'émoticones au cours de la compétition",
						backgroundColor : "#00ACED",
						data : this.getDailyNumberOfEmoticons(dailyEmoticons).reverse()
					}
				]
			
			},
			options : {}
		});
	}
    
    render() {
        return (
        	<canvas id="emoticones">
			</canvas>
        );
    }
}
 
export default LineChart;
