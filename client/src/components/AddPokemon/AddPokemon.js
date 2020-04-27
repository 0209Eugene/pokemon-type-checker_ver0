import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getMovesQuery } from '../../queries/queries';


function AddPokemon() {
    const { loading, error, data } = useQuery(getMovesQuery);
    if (loading) return <option>Loading Moves data</option>;
    if (error) return <option>Error</option>;
    return data.moves.map((move) => {
          return (
            <option key={move.id} value={move.id}>{move.name}</option>
          )
      });
}

export default AddPokemon;
