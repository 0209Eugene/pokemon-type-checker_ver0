import React, { Component } from 'react';
import DisplayPokemonList from './DisplayPokemonList';


class PokemonList extends Component {

  render() {
    return (
      <div>
        <ul id="pokemonList">
          <DisplayPokemonList />
        </ul>
      </div>
    );
  }
}

export default PokemonList;
