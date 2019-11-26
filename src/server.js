import express from 'express';
import passport from 'passport';
import bp from 'body-parser';
import cp from 'cookie-parser';

import db from './models/index';
import {} from 'dotenv/config';
import auth from './routes/auth';
import users from './routes/user';

const server = express();

server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(cp());

// Passport init
server.use(passport.initialize());
server.use(passport.session());

server.use('/', auth);
server.use('/users', passport.authenticate('jwt', { session: false }), users);

const PORT = process.env.PORT || 3300;

db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
});
