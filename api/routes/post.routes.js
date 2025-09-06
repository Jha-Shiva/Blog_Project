import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

//create a new post
router.post('/create', verifyToken, createPost)


export default router;