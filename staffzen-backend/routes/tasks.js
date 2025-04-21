const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

// Create a new task (Manager only)
router.post("/create", verifyToken, async (req, res) => {
  const { title, description, assignedTo } = req.body;

  if (!title || !assignedTo) {
    return res.status(400).json({ msg: "Title and assigned employee are required" });
  }

  try {
    const task = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get tasks assigned to an employee
router.get("/employee/:id", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update task status (for Employee)
router.put("/update/:id", verifyToken, async (req, res) => {
  const { status } = req.body;
  if (!status || !["Pending", "Completed"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
