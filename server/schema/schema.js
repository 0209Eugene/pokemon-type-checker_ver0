const graphql = require('graphql');
const _ = require('lodash');
const Pokemon = require('../models/pokemon');
const Move = require('../models/move');

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLList,
        GraphQLInt,
        GraphQLID
      } = graphql;

// dummy data
// var pokemons = [
//   { id: '25', name: 'Pikachu', types: ['Electric'], moveId: ['1', '2'] },
//   { id: '26', name: 'Raichu', types: ['Electric'], moveId: ['1', '3'] }
// ];

// var moves = [
//   { id: '1', name: 'Thunderbolt', power: 120, pokemonId: '25' },
//   { id: '2', name: 'Iron Tail', power: 70, pokemonId: '25' },
//   { id: '3', name: 'Volt Switch', power: 60, pokemonId: '26' }
// ];

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    no: { type: GraphQLInt },
    name: { type: GraphQLString },
    types: { type: new GraphQLList(GraphQLString) },
    moves: {
      type: new GraphQLList(MoveType),
      resolve(parent, args) {
        // return _.filter(moves, { id: parent.moveId[0] }); // Todo Fix many to many
      }
    }
  })
});

const MoveType = new GraphQLObjectType({
  name: 'Move',
  fields: () => ({
    no: { type: GraphQLInt }, 
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    power: { type: GraphQLInt },
    canUsePokemonId: { type: GraphQLList(GraphQLID) }
    // canUsePokemons: {
    //   type: new GraphQLList(PokemonType),
    //   resolve(parent, args) {
    //     return _.filter(pokemons, {id: parent.pokemonId }) // Todo Fix many to many
    //   }
    // }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pokemon: {
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(pokemons, { id: args.id });
      }
    },
    move: {
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(moves, { id: args.id });
      }
    },
    pokemons: {
      type: new GraphQLList(PokemonType),
      resolve(parent, args) {
        // return pokemons;
      }
    },
    moves: {
      type: new GraphQLList(MoveType),
      resolve(parent, args) {
        // return moves;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPokemon: {
      type: PokemonType,
      args: {
        no: {type: GraphQLInt },
        name: { type: GraphQLString },
        types: { type: new GraphQLList(GraphQLString) },
        moveId: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        let pokemon = new Pokemon({
          no: args.no,
          name: args.name,
          types: args.types,
          moveId: args.moveId
        });
        return pokemon.save();
      }
    },
    addMove: {
      type: MoveType,
      args: {
        no: { type: GraphQLInt },
        name: { type: GraphQLString },
        power: { type: GraphQLInt },
        type: { type: GraphQLString },
        canUsePokemonId: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        let move = new Move({
          no: args.no,
          name: args.name,
          power: args.power,
          type: args.type,
          canUsePokemonId: args.canUsePokemonId
        });
        return move.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})