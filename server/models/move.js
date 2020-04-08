const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema({
  no: Number,
  name: String,
  power: Number,
  type: String,
  canUsePokemonId: []
})

module.exports = mongoose.model('Move', moveSchema);