import express from 'express';
import { createPost, deletePost, getAllPosts, updatepost } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

//create a new post
router.post('/create', verifyToken, createPost)
router.get('/getposts', getAllPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

export default router;