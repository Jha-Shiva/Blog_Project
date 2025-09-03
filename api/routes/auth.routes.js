import express from 'express';
import { userSignIn, userSignUp } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);

export default router;