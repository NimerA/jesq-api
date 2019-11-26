import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { User } from '../models/index';

const privateKey = fs.readFileSync('private.key');

/**
 * Returns a hashes password
 * @param {string} password
 */
async function hashPassword(password) {
  const saltRounds = 10;

  console.log(password);
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

async function register(req, res) {
  try {
    const user = await User.findAll({ where: { username: req.body.username } });
    if (user.length !== 0) {
      return res.status(400).json({ error: 'User already exist.' });
    }
    console.log(req.body);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    };
    console.log(newUser);
    const createdUser = await User.create(newUser);
    console.log('lazy breakpoint2');
    return res.status(201).json({ createdUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function login(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400).send(err.message);
    }

    if (!user) {
      return res.status(401).send({ error: info });
    }

    req.login(user, { session: false }, (passportErr) => {
      if (passportErr) {
        return res.status(400).send(err.message);
      }

      const token = jwt.sign(
        user.toJSON(),
        privateKey,
        { expiresIn: '1d', algorithm: 'RS256' },
      );

      return res.status(200).json({ user, token });
    });
    return null;
  });
}

// TODO changePassword, Logout

// Endpoint to logout
function logout(req, res) {
  req.logout();
  res.send(null);
}

export {
  login,
  logout,
  register,
  hashPassword,
};
