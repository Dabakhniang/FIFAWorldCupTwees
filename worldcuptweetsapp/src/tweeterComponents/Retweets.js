import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import BubbleChart from './BubbleChart';

const TWEETS = gql`
				{
				  tweets{
				 		id
					retweets
					text
				  }
				}
                `;

class Retweets extends Component {

	/**
	* Méthode qui récrit les données fournies par Graphql
	* Sous forme { date : {number,replies,retweets,likes}}
	*/
	rewriteList(liste) {
	  	  var result = [];
		  for (var i in liste) {
		  		var tweet = liste[i];
		  		result.push({
		  							'auto_id' : i,
		  							'id' : tweet.id,
		  							'retweets' : tweet.retweets,
		  							'text' : tweet.text
		  							});
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
				      			//var days = this.dailyTweets(this.rewriteList(data.tweets)):
				      			var tweets = this.rewriteList(data.tweets);
				      			return <BubbleChart data={tweets} />;
				    		}}
				</Query>		
		);
  	}

}

export default Retweets;
