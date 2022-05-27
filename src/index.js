import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AppProvider } from "./AppContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.NODE_ENV !== 'production' ? 'http://localhost:4040/graphql' : 'http://localhost:4040/graphql',
  credentials: 'include'
});


const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
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
