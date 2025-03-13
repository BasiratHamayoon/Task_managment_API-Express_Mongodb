const express = require("express");
const cors = require("cors")
const authRoute = require("./routes/authRoutes.js");
const taskRoute = require("./routes/taskRoutes.js");
const authMiddleware = require("./midddlewares/auth.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/tasks", authMiddleware, taskRoute);

module.exports = app;