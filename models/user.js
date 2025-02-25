const Joi = require('joi');
const mongoose = require('mongoose');

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required().min(5).max(75),
        email: Joi.string().required().min(5).max(75).email(),
        password: Joi.string().required().min(6).max(255)
    });

    return schema.validate(user);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 75
    },

    email: {
        type: String,
        unique: true,
        required: true,
        min: 5,
        max: 75
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

const User = mongoose.model("User", userSchema);

exports.validateUser = validateUser;
exports.User = User;