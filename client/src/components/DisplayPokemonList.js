import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getPokemonsQuery = gql`
{
  pokemons{
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
          <ul id="pokemonList">
            {/* <li>{pokemon.no}</li> */}
            <li key={pokemon.id}>{pokemon.name}</li>
            {/* <li>{pokemon.types}</li> */}
          </ul>
        )
      });
  }

export default DisplayPokemonList;
