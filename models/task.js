const Joi = require('joi');
const mongoose = require('mongoose');

function validateTask(task) {
    const schema = Joi.object({
        importance: Joi.string().required(),
        task: Joi.string().required().min(3).max(16),
        date: Joi.string().required(),
        details: Joi.string().required().min(8).max(500),
    })
    return schema.validate(task)
}

const taskSchema = new mongoose.Schema({
    
    importance: {
        type: String,
        required: true,
    },
    
    task: {
        type: String,
        required: true,
        min: 3,
        max: 16
    },

    date: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true,
        min: 8,
        max: 500
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
});

const Task = mongoose.model("Task", taskSchema);

exports.validateTask = validateTask;
exports.Task = Task;

