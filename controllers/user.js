import { hashPassword } from './auth';
import { User } from '../models/index';


async function getAll(req, res) {
  try {
    const users = await User.findAll({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


// TODO COMPLETE THIS
async function getMe(req, res) {
  res.send(req.user);
}

async function create(req, res) {
  try {
    const user = await User.findAll({ where: { username: req.body.username } });
    if (user) {
      return res.status(400).json({ error: 'User Already Exist' });
    }
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashPassword(req.body.password),
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
};
