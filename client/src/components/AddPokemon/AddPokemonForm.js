import React, { Component } from 'react';
import AddPokemon from './AddPokemon';


class AddPokemonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      types: '',
      moveId: [],
    }
  }

  

  submitForm(e) {
    const types = this.state.types;
    e.preventDefault();
    types.concat(e.types);
    console.log(this.state);
  }

  render() {
    const movesId = this.state.moveId;
    return (
      <form id="addForm" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Pokemon Name: </label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Types: </label>
          <input type="text" onChange={(e) => this.setState({types: e.target.value})}/>
        </div>
        <div className="field">
          <label>Moves: </label>
          <select
            onChange={(e) => this.setState({ moveId: movesId.concat(e.target.value) })}
          >
            <option>Select moves</option>
            <AddPokemon />
          </select>
        </div>
        <button>Register</button>
      </form>
    );
  }
}

export default AddPokemonForm;
