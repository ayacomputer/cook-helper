const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({


});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
