const express = require('express');
const mongoose = require('mongoose');
const { validateUser, User } = require('../models/user');
const router = express.Router();
const auth = require("../middleware/auth");


router.post("", async(req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne( {email: req.body.email});
    if(user) return res.status(400).send('Email already registered');
    user = new User({username: req.body.username, email: req.body.email, password: req.body.password});
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({name: user.name, email: user.email});
});

router.get("/me",auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


module.exports = router;