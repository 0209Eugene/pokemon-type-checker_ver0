const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  no: Number,
  name: String,
  types: [],
  moves: []
})

module.exports = mongoose.model('Pokemon', pokemonSchema);