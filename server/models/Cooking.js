const { Schema, model } = require('mongoose');

const cookingSchema = new Schema({

});

const Cooking = model('Cooking', cookingSchema);

module.exports = Cooking;
