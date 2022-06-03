import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AppProvider } from "./AppContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from  } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getAllOrders: offsetLimitPagination()
      },
    },
  },
});
const link = createHttpLink({
  uri: process.env.NODE_ENV !== 'production' ? 'http://localhost:4040/graphql' : 'http://localhost:4040/graphql',
  credentials: 'include'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if(message === 'Access denied!') {        
        window.location = '/logout';
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }  

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, link]),
  cache: cache,
});

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <AppProvider>
          <App />
        </AppProvider>
      </ApolloProvider>  
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
