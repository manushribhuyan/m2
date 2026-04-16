const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://mongo:27017/tasks");

const Task = mongoose.model("Task", {
  title: String
});

app.get("/tasks", async (req, res) => {
  res.json(await Task.find());
});

app.post("/tasks", async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running"));