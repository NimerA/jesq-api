import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/user';

const privateKey = fs.readFileSync('jwtRS256.key');

/**
 * Returns a hashes password
 * @param {string} password
 */
async function hashPassword(password) {
  const saltRounds = 10;
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
    const user = await User.findByUsername(req.body.username);
    if (user) {
      return res.status(400).json({ error: 'User already exist.' });
    }
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    };
    const createdUser = await User.create(newUser);
    return res.status(201).json({ createdUser });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function login(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { return res.status(400).send(err.message); }
    if (!user) { return res.status(401).send({ error: info }); }
    req.login(user, { session: false }, (error) => {
      if (error) { return res.status(400).send(error.message); }
      const token = jwt.sign(
        user.toJSON(),
        privateKey,
        { expiresIn: '15m', algorithm: 'RS256' },
      );
      return res.status(200).json({ user, token });
    });
    return null;
  })(req, res);
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
