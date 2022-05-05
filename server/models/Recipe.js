const { Schema, model } = require('mongoose');


const recipeSchema = new Schema({

    recipeName: {
        type: String,
        required: true,
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
    },
    totalTime: {
        type: Number,
        required: true,
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;