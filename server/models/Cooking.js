const { Schema, model } = require('mongoose');

const cookingSchema = new Schema({

    cookingId: {
        type: Number,
        required: true,
    },
    cookingName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

const Cooking = model('Cooking', cookingSchema);

module.exports = Cooking;
