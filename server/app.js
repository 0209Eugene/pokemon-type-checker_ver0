const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// arrow cross-origin requests
app.use(cors());

// connect tomlab database
mongoose.connect('mongodb+srv://yuto:Veda0209@gql-pokemon-kt5cl.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
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