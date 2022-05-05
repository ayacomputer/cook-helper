const { Schema, model } = require('mongoose');
const moment = require('moment');


const recipeSchema = new Schema({

    recipeName: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: String,
        default: moment(new Date()).format('DD MMM YYYY [at] hh:mm a'),
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