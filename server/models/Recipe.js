const { Schema, model } = require('mongoose');


const recipeSchema = new Schema({

    recipeName: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    ingredients: {
        type: String,
    },
    instruction: {
        type: String,
        required: true
    },
    totalTime: {
        type: String,
        required: true,
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;