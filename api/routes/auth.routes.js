import express from 'express';
import { google, userSignIn, userSignUp } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/google', google);

export default router;