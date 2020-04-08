const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect tomlab database
mongoose.connect('mongodb+srv://gql-pokemonmdb-user:Veda0209@gql-pokemon-kt5cl.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  // Schema(which represents how the graph look) is Here
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening...');
});