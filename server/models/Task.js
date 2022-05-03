const { Schema, model } = require('mongoose');

const taskSchema = new Schema({

    startAt: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    taskType: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

const Task = model('Task', taskSchema);

module.exports = Task;