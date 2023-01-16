import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

//install ApolloClient and graphQL and import dependencies
//Apollo contains all the pieces needed to wire up the graphql Client for our app.
//graphql - apollo client uses some of it's functionality within.

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import App from './components/App'
import './styles/index.css'

//create httpLink that will connect our ApolloClient instance with the GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

//instantiate apolloclient 
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


//App is wrapped with the higher-order component ApolloProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
)
