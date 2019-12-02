import fs from 'fs';
import passport from 'passport';
import JWTStrategy from 'passport-jwt/lib/strategy';
import ExtractJWT from 'passport-jwt/lib/extract_jwt';
import LocalStartegy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';
import bcrypt from 'bcrypt';
import User from '../models/user';
import {} from 'dotenv/config';
import oauthIds from './oauth';

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

passport.use(new GoogleStrategy({
  clientID: oauthIds.google.clientID,
  clientSecret: oauthIds.google.clientSecret,
  callbackURL: oauthIds.google.callbackURL,
},
async (request, accessToken, refreshToken, profile, done) => {
  try {
    // const user = await User.findOne({ oauthID: profile.id });
    // if (user) {
    // return done(null, user);
    // }
    console.log(profile);
    return done(null, profile);
  } catch (error) {
    return done(error);
  }
  /**
  User.findOne({ oauthID: profile.id }, (err, user) => {
    if (err) {
      console.log(err); // handle errors!
    }
    if (!err && user !== null) {
      done(null, user);
    } else {
      user = new User({
        oauthID: profile.id,
        name: profile.displayName,
        created: Date.now(),
      });
      user.save((err) => {
        if (err) {
          console.log(err); // handle errors!
        } else {
          console.log('saving user ...');
          done(null, user);
        }
      });
    }
  }); */
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
