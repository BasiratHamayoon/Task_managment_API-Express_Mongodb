const express = require("express");
const { createTask, getTask, deleteTask } = require("../controllers/taskController.js");
const router = express.Router();

router.post("/", createTask); 
router.get("/", getTask); 
router.delete("/:id", deleteTask); 

module.exports = router;
