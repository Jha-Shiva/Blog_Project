import express from 'express';
import { deleteUser, getUser, getUsers, profileUpdate, signOut } from '../controllers/user.controllers.js';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyUser.js';


const router = express.Router();

router.put('/update/:userId',verifyToken, profileUpdate)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', verifyToken, signOut)
router.get('/getusers', verifyToken, getUsers)
router.get('/:userId', getUser)

export default router;