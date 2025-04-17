const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post("", async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const vaildPassword = await bcrypt.compare(req.body.password, user.password);
    if (!vaildPassword) return res.status(400).send("Invaild email or password");

    const token = user.generateAuthToken();
    res.header('x-auth-token', token);
    res.send(token);
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(75).email(),
        password: Joi.string().required().min(6).max(255)
    });
    return schema.validate(req);
}

module.exports = router;