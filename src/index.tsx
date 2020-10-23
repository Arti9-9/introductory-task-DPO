import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import App from './App';
const ApolloBoost = require('apollo-boost');
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: 'https://developer.github.com/v4/explorer/'
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
