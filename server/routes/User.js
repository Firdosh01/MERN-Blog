import express from 'express'
import { test, updateUser } from '../controllers/User.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/test', test)
router.put('/update:userId', verifyToken,updateUser);

export default router