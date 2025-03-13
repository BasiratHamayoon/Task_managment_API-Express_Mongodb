const express = require("express");
const { createTask, getTask, deleteTask } = require("../controllers/taskController.js");
const router = express.Router();

router.post("/", createTask);
router.post("/", getTask);
router.post("/:id", deleteTask);

module.exports = router;
