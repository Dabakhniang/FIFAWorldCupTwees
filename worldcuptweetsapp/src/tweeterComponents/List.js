import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const TWEETS = gql`
				{
				  tweets{
				 	id
					date
					replies
					retweets
					likes
					hashtags
					replyings
					text 
				  }
				}
                `;
                
var onlyUnique = (value, index, self) =>{ 
    	return self.indexOf(value) === index;
	}       

var uniqueString= (str) => {
	var liste = str.split(" ");
	liste = liste.filter( onlyUnique );
	return liste.filter( onlyUnique ).join(" ");
}
	       
class List extends Component{

    render(){
        return(
            <div className="row">
            	<div className="[ col-xs-12 col-sm-offset-2 col-sm-8 ]">
            		<ul className="event-list">
				    	<Query query={TWEETS}>
				    		{({loading, error, data}) => {
				    			if (loading) return <p>Loading...</p>;
				      			if (error) return <p>Error :(</p>;
				      			
				      			return data.tweets.map(({id,date,replies,retweets,likes,hashtags,replyings,text}) => {
				      				var d = new Date(date);
				      				const month = d.toLocaleString('en-us', { month: 'long' });
				      				return (					
				      					<li>
											<time dateTime="2014-07-20">
												<span className="day">{d.getDate()}</span>
												<span className="month">{month}</span>
											</time>
											<div className="info">
												<h3 className="title">{uniqueString(hashtags)}</h3>
												<p className="desc">{text}</p>
												<ul>
													<li style={{ width: "33%" }}>{likes}<span className="glyphicon glyphicon-heart-empty"></span></li>
													<li style={{ width: "34%" }}>{retweets}<span className="glyphicon glyphicon-retweet"></span></li>
													<li style={{ width: "33%" }}>{replies}<span className="far fa-comment"></span></li>
												</ul>
											</div>
										</li>);
				      			});
				    		}}
				    	</Query>
				    </ul>
            	</div>
            </div>
        );
    }

}

export default List;
