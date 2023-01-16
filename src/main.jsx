import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

//install ApolloClient and graphQL and import dependencies
//Apollo contains all the pieces needed to wire up the graphql Client for our app.
//graphql - apollo client uses some of it's functionality within.

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './components/App'
import './styles/index.css'
import { AUTH_TOKEN } from './constants';

//create httpLink that will connect our ApolloClient instance with the GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

//set token to graphql context to be read by the graphql api
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

//instantiate apolloclient
// /Apollo Links allow us to create middlewares 
// that modify requests before they are sent to the server.

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
