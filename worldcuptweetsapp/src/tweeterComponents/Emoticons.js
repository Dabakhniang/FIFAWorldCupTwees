import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LineChart from './LineChart';

const TWEETS = gql`
				{
				  tweets{
				 	date
					emoticons
				  }
				}
                `;

class Emoticons extends Component {

	/**
	* Méthode qui récrit les données fournies par Graphql
	* Sous forme { date : {number,replies,retweets,likes}}
	*/
	rewriteList(liste) {
	  	  var rewrited = [];
		  for (var i in liste) {
		  		var tweet = liste[i];
		  		var date = tweet.date.split(" ")[0];
				if(Object.keys(rewrited).indexOf(date)>=0){
					rewrited[date] = {'value' : rewrited[date]['value'] + parseInt(tweet.emoticons)}
				}else{
					rewrited[date] = {'value' : parseInt(tweet.emoticons)}
				}
		  }
		  return rewrited;
	}
	/**
	* Méthode qui permet l'affichage des tweets par jour
	*/
	 render() {
		return (		
				<Query query={TWEETS}>
				    		{({loading, error, data}) => {
				    			if (loading) return <p>Loading...</p>;
				      			if (error) return <p>Error :(</p>;
				      			
				      			var days = this.rewriteList(data.tweets);
				      			return <LineChart data={days} />;
				    		}}
				</Query>		
		);
  	}

}

export default Emoticons;
