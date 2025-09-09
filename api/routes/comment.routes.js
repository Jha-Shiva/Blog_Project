import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { createComment } from '../controllers/comment.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);

export default router;