import express from 'express';
import { createPost, getAllPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

//create a new post
router.post('/create', verifyToken, createPost)
router.get('/getposts', getAllPosts)


export default router;