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
        GraphQLID,
        GraphQLNonNull
      } = graphql;

const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  fields: () => ({
    no: { type: GraphQLInt },
    name: { type: GraphQLString },
    types: { type: GraphQLList(GraphQLString) },
    // moveId: { type: GraphQLList(GraphQLID)},
    moves: {
      type: new GraphQLList(MoveType),
      resolve(parent, args) {
        return Move.find({ canUsePokemonId: parent.id }) // Todo Fix many to many
        // return _.filter(Move, { canUsePokemonId: parent.id })
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
        return Pokemon.findById(args.id);
      }
    },
    move: {
      type: MoveType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(moves, { id: args.id });
        return Move.findById(args.id);
      }
    },
    pokemons: {
      type: new GraphQLList(PokemonType),
      resolve(parent, args) {
        // return pokemons;
        return Pokemon.find({});
      }
    },
    moves: {
      type: new GraphQLList(MoveType),
      resolve(parent, args) {
        // return moves;
        return Move.find({});
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
        no: {type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        power: { type: GraphQLInt },
        type: { type: new GraphQLNonNull(GraphQLString) },
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