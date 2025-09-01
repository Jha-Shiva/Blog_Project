import express from 'express';
import testPost from '../controllers/test.controller.js';

const router = express.Router();

router.post('/', testPost)

export default router