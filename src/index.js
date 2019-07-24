import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
import client from "./apollo"

const App = (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
  

ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();