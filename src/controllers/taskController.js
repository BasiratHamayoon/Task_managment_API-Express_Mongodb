const Task = require("../models/task.js");

exports.createTask = async (req, res) => {
    try{
        const { title, description } = req.body;
        const task = new Task ({ title, description, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.getTask = async (req, res) => {
    try{
        const tasks = await Task.find({user: req.user.id});
        res.json(tasks);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if(!task) return res.status(404).json({ message: "Task not Found!"});
        await task.deleteOne();
        res.json({ message: "Task Deleted!"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};