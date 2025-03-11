const express = require('express');
const mongoose = require('mongoose');
const { validateTask, Task } = require('../models/task');
const router = express.Router();
const auth = require("../middleware/auth");


router.post("/",auth, async(req, res) => {
    const {error} = validateTask(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let task = await Task.findOne( {task: req.body.task, date: req.body.date});
    if(task) return res.status(400).send('The task already exists for the selected date');
    task = new Task({task: req.body.task, importance: req.body.importance, date: req.body.date, details: req.body.details});
    await task.save();
    res.send(task);
});

router.get("/",auth, async(req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
})

router.delete("/:id",auth, async(req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found');
    res.send(task);
});

module.exports = router;