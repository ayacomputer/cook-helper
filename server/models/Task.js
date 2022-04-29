const { Schema, model } = require('mongoose');

const taskSchema = new Schema({

});

const Task = model('Task', taskSchema);

module.exports = Task;