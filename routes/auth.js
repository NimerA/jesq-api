import { Router } from 'express';
import {
  login, logout, register, googleLogin, googleCallback,
} from '../controllers/auth';

const router = Router();

// Google Login Start
router.get('/google', googleLogin);
// Google Login Callback
router.get('/google/callback', googleCallback);
// Local Login
router.post('/login', login);
// Logout
router.get('/logout', logout);
// Register
router.post('/register', register);
// Change Password

export default router;
