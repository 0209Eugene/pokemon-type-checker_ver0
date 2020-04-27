import { gql } from 'apollo-boost';


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

const getMovesQuery = gql`
{
  moves{
    id,
    name,
    power,
    type
  }
}
`;

export { getPokemonsQuery, getMovesQuery };