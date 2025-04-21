import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all users (for manager to assign tasks)
router.get('/', verifyToken, getAllUsers);

export default router;
