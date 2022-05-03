const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            max_length: 50,
        },
        lastName: {
            type: String,
            required: true,
            max_length: 50,
        },

        recipes: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);