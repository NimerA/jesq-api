import { Router } from 'express';
import { getAll, getMe, create } from '../controllers/user';

const router = Router();

// Get all Users
router.get('/', getAll);
// Get own profile
router.get('/me', getMe);
// Create a new user
router.post('/', create);

export default router;
