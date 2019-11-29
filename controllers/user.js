import { hashPassword } from './auth';
import User from '../models/user';

// gets all the users on database
async function getAll(_req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// gets a user specified by id
async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: 'User not found.' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// Gets the profile of the logedin user
async function getMe(req, res) {
  res.send(req.user);
}


// creates a new user
async function create(req, res) {
  try {
    const user = await User.findByUsername(req.body.username);
    if (user) {
      return res.status(400).json({ error: 'User Already Exist' });
    }
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdUser = await User.create(newUser);
    return res.status(201).json({ createdUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export {
  getAll,
  getMe,
  create,
  getById,
};
