const express = require('express');
const mongoose = require('mongoose');
const { validateTask, Task } = require('../models/task');
const router = express.Router();
const auth = require("../middleware/auth");


router.post("/",auth, async(req, res) => {
    const {error} = validateTask(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const tasks = await Task.find({userId: req.user._id});
    if(tasks.length > 49) return res.status(403).send("Task limit reached. Contact admin for more info.");
    let task = await Task.findOne( {task: req.body.task, date: req.body.date});
    if(task) return res.status(400).send('The task already exists for the selected date');
    task = new Task({task: req.body.task, importance: req.body.importance, date: req.body.date, details: req.body.details, userId: req.user._id});
    await task.save();
    res.send(task);
});

router.put("/:id/checkbox", auth, async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {checked: req.body.checked});
    if (!task) return res.status(404).send("The task with the give ID was not found");
    res.send("Task status updated for task id:" + task._id);
})

router.put("/:id", auth, async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, {importance: req.body.importance, task:req.body.task, date:req.body.date, details: req.body.details});
    if (!task) return res.status(404).send("The task with the give ID was not found");
    res.send("Task status updated for task id:" + task._id);
})

router.get("/",auth, async(req, res) => {
    const tasks = await Task.find({userId: req.user._id});
    if(!tasks) return res.status(404).send("No tasks found for provided user ID");
    res.send(tasks);
})

router.get("/:id", auth, async(req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("The task with the give ID was not found");
    res.send(task);
})

router.delete("/:id",auth, async(req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found');
    res.send(task);
});

module.exports = router;