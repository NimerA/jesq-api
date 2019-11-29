import { Router } from 'express';
import {
  getAll, getMe, create, getById,
} from '../controllers/user';

const router = Router();

// Get all Users
router.get('/', getAll);

// Get own profile
router.get('/profile', getMe);
// Create a new user
router.post('/', create);

// get by id
router.get('/:id', getById);
// update by id
// router.put('/:id', updateById);
// delete by id
// router.delete('/:id', deleteById);


// bulk update
// bulk delete
// bulk create


export default router;
