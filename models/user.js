const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const privateKey = process.env.JWT_TOKEN

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
        max: 1024
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, "iYGa2wylF2X7ohVUeI37Hm26JKjtHa2n");
    return token;
}

const User = mongoose.model("User", userSchema);

exports.validateUser = validateUser;
exports.User = User;