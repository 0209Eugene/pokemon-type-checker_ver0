import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import PokemonList from './components/PokemonList/PokemonList';
import AddPokemonForm from './components/AddPokemon/AddPokemonForm';

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
        <AddPokemonForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
