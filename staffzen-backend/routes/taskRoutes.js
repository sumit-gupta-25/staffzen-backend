import express from 'express';
import { getAllTasks, createTask } from '../controllers/taskController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import Task from '../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', verifyToken, getAllTasks);

// POST create task
router.post('/create', verifyToken, createTask);

// ✅ GET tasks assigned to a specific employee
router.get('/employee/:userId', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks for employee" });
  }
});

// ✅ PUT update task status
router.put('/update/:taskId', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
});

export default router;

