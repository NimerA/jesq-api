import express from 'express';
import bp from 'body-parser';
import cp from 'cookie-parser';
import passport from './config/passport';

import db from './models/index';
import {} from 'dotenv/config';
import auth from './routes/auth';
import users from './routes/user';

const server = express();

server.use(cp());
server.use(bp.urlencoded({ extended: false }));
server.use(bp.json());

// Passport init
server.use(passport.initialize());
server.use(passport.session());

/**
 * middleware for checking authorization with jwt
 */
function authorized(req, res, next) {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (err || !user) {
      res.status(401).json(err);
      return;
    }
    next();
  })(req, res, next);
}

server.use('/auth', auth);
server.use('/users', authorized, users);

// Handle errors
server.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ error: err });
});

const PORT = process.env.PORT || 3300;

db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
});
