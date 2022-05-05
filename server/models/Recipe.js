const { Schema, model } = require('mongoose');
const moment = require('moment');


const recipeSchema = new Schema({

    recipeId: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: String,
        default: moment(new Date()).format('DD MMM YYYY [at] hh:mm a'),
    },
    recipeName: {
        type: String,
    },
    ingredients: {
        type: [String],
    },
    instructions: [
        {
            prep: {
                type: String,
                required: true,
            },
            steps: {
                type: String,
                required: true,
            }

        }
    ]
    ,
    time: [{
        prep: {
            type: Number,
            min: 0,
        },
        cook: {
            type: Number,
            min: 0,
        },
        total: {
            type: Number,
            min: 0,
        }
    }],
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;