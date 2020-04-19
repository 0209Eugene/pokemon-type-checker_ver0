import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getPokemonsQuery = gql`
{
  pokemons{
    id,
    no,
    name,
    types
  }
}
`;

function DisplayPokemonList() {
    const { loading, error, data } = useQuery(getPokemonsQuery);
    if (loading) return <div>Loading Pokemon List</div>;
    if (error) return <div>Error</div>;
    return data.pokemons.map((pokemon) => {
          return (
              <li key={pokemon.id}>{pokemon.name}</li>
          )
      });
  }

export default DisplayPokemonList;
