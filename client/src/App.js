import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';


import Login from './pages/login';
import Cooking from './pages/cooking';
import Recipes from './pages/recipes';
import SignUp from './pages/signup';
import CreateRecipe from './pages/createRecipe'


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/cooking"
              element={<Cooking />}
            />
            <Route
              path="/recipes"
              element={<Recipes />}
            />
            <Route
              path="/createRecipe"
              element={<CreateRecipe />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider >
  );
}

export default App;
