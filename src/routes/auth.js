import { Router } from 'express';
import { login, logout, register } from '../controllers/auth';

const router = Router();

// Login
router.post('/login', login);
// Logout
router.get('/logout', logout);
// Register
router.post('/register', register);
// Change Password

export default router;
