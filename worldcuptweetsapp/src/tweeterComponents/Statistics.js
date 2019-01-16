import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
//import BarChart from './BarChart';
import BarChart from './BarChart';

const TWEETS = gql`
				{
				  tweets{
				 		id
					date
					replies
					retweets
					likes 
				  }
				}
                `;

class Statistics extends Component {

	/**
	* Méthode qui récrit les données fournies par Graphql
	*/
	rewriteList(liste) {
	  	  var rewrited = [];
		  for (var i in liste) {
		  		var tweet = liste[i];
		  		var date = tweet.date.split(" ")[0];
				if(Object.keys(rewrited).indexOf(date)>=0){
					rewrited[date] = { 
														'number' : rewrited[date]['number']  + 1, 
														'replies' : rewrited[date]['replies'] + parseInt(tweet.replies), 
														'retweets' : rewrited[date]['retweets'] + parseInt(tweet.retweets), 
														'likes' : rewrited[date]['likes'] + parseInt(tweet.likes)
														}
				}else{
					rewrited[date] = { 
														'number' : 1, 
														'replies' : parseInt(tweet.replies), 
														'retweets' : parseInt(tweet.retweets), 
														'likes' : parseInt(tweet.likes)
														}
				}
		  }
		  return rewrited;
	}
	
	/**
	* Méthode qui regoupe les tweets par jour.
	*/
	dailyTweets(liste){
		var result = [];
		for (var d in liste){
		  		result.push({"date":d, "number" : liste[d].number, "replies":liste[d].replies, "retweets":liste[d].retweets, "likes":liste[d].likes });
		}	 
		return result;
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
				      			
				      			// Rewrite the list of tweets to get days and the number of tweets for each day.
				      			var days = this.dailyTweets(this.rewriteList(data.tweets));
				      			return <BarChart data={days} />;
				    		}}
				</Query>		
		);
  	}

}

export default Statistics;
