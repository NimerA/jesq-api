import fs from 'fs';
import passport from 'passport';
import JWTStrategy from 'passport-jwt/lib/strategy';
import ExtractJWT from 'passport-jwt/lib/extract_jwt';
import LocalStartegy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';

const privateKey = fs.readFileSync('jwtRS256.key');

passport.use(new LocalStartegy(async (username, password, cb) => {
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return cb(null, user);
    }
    return cb(null, false, { message: 'Incorrect username or password.' });
  } catch (error) {
    return cb(error);
  }
}));

passport.use(new JWTStrategy(
  {
    secretOrKey: privateKey,
    algorithms: ['RS256'],
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, cb) => {
    try {
      return cb(null, jwtPayload);
    } catch (err) {
      return cb(err, false);
    }
  },
));

export default passport;
