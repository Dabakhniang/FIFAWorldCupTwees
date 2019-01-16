import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './App.css';
import List from './tweeterComponents/List';
import Statistics from './tweeterComponents/Statistics';
import Retweets from './tweeterComponents/Retweets';
import Emoticons from './tweeterComponents/Emoticons';

//to connect to the graphQl back-end
const client = new ApolloClient({
    uri: "http://localhost:3002/graphql"
});

class App extends Component {
  render() {
    return (
		<Router>
			<ApolloProvider client={client}>	
  			
		    		<Route exact path="/" component={List} />
		    		<Route path="/Statistics" component={Statistics} />
		    		<Route path="/retweets" component={Retweets} />
		    		<Route path="/emoticons" component={Emoticons} />
				
    		</ApolloProvider>
    	</Router>
    );
  }
}


export default App;
