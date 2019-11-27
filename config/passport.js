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
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload, cb) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    return cb(null, await User.findById(id));
  } catch (err) {
    return cb(err);
  }
});


export default passport;
