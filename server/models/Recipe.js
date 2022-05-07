const { Schema, model } = require('mongoose');


const recipeSchema = new Schema({

    name: {
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
    ingredients: [{
        name: {
            type: String
        },
        qty: {
            type: String
        }
    }],
    steps: {
        type: [String],
    },
    totalTime: {
        type: Number,
        required: true,
    },
    serves: {
        type: Number
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;