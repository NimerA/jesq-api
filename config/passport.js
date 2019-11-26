import fs from 'fs';
import passport from 'passport';
import JWTStrategy from 'passport-jwt/lib/strategy';
import ExtractJWT from 'passport-jwt/lib/extract_jwt';
import LocalStartegy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/index';

const privateKey = fs.readFileSync('private.key');

passport.use(new LocalStartegy(async (argUsername, argPassword, cb) => {
  try {
    const user = await User.findAll({ where: { username: argUsername } });
    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    const match = await bcrypt.compare(argPassword, user.password);
    if (match) {
      return cb(null, User);
    }
    return cb(null, false, { message: 'Incorrect username or password.' });
  } catch (error) {
    return cb(error);
  }
}));

passport.use(new JWTStrategy(
  {
    secretOrKey: privateKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload, cb) => {
    try {
      const user = await User.findAll({ where: { id: jwtPayload.id } });
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  },
));

export default passport;
