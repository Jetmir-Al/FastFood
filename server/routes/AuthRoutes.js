import express from 'express';
import { handleLogin, handleDeleteAcc, handleSignUp, status } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);
router.get('/status', status);
router.delete('/deleteAcc', handleDeleteAcc);

export default router;