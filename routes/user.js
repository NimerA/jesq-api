import { Router } from 'express';
import {
  getAll, getMe, create, getById,
} from '../controllers/user';

const router = Router();

// Get all Users
router.get('/', getAll);
// Get User with Id
router.get('/:id', getById);
// Get own profile
router.get('/profile', getMe);
// Create a new user
router.post('/', create);

export default router;
