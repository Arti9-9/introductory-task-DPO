import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";

import App from './App';

const client = new ApolloClient<any>({
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
