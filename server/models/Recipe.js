const { Schema, model } = require('mongoose');


const recipeSchema = new Schema({

    recipeId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        prep: {
            type: String,
            required: true,
        },
        steps: {
            type: [String],
            required: true,
        }
    },
    time: {
        prep: {
            type: Number,
            min: 0,
            default: 0,
        },
        cook: {
            type: Number,
            min: 0,
            default: 0,
        },
        total: {
            type: Number,
            min: 0,
            default: 0,
        }
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;