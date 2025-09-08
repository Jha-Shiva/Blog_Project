import express from 'express';
import { createPost, deletePost, getAllPosts } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

//create a new post
router.post('/create', verifyToken, createPost)
router.get('/getposts', getAllPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)


export default router;