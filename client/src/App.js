import React from 'react';
import PokemonList from './components/PokemonList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client = {client}> 
      <div id="main">
        <h1>Pokemon Type Checker</h1>
        <PokemonList />
      </div>
    </ApolloProvider>
  );
}

export default App;
