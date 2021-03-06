'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    _  = require('lodash'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    auth = new require('./auth.ctrl')(),
    User = mongoose.model('User');

// Serialize the user id to push into the session
passport.serializeUser(function(user, done) {
        done(null, user.id);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
});

// Use local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(email, password, done) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'Unknown user'
      });
    }
    if (!user.authenticate(password)) {
      return done(null, false, {
        message: 'Invalid password'
      });
    }
    return done(null, user.toPassport());
  });
}
));

// Use twitter strategy
// passport.use(new TwitterStrategy({
//   consumerKey: process.env.TWITTER_CLIENTID,
//   consumerSecret: process.env.TWITTER_CLIENTSECRET,
//   callbackURL: process.env.TWITTER_CALLBACKURL
// },
// function(token, tokenSecret, profile, done) {
//   User.findOne({
//     'twitter.id_str': profile.id
//   }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//       return done(err, user);
//     }
//     user = new User({
//       name: profile.displayName,
//       username: profile.username,
//       provider: 'twitter',
//       twitter: profile._json,
//       roles: ['authenticated']
//     });
//     user.save(function(err) {
//       if (err) {
//         console.log(err);
//         return done(null, false, {message: 'Twitter login failed, email already used by other login strategy'});
//       } else {
//         return done(err, user);
//       }
//     });
//   });
// }
// ));

// Use facebook strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENTID,
  clientSecret: process.env.FACEBOOK_CLIENTSECRET,
  callbackURL: process.env.FACEBOOK_CALLBACKURL
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'facebook.id': profile.id
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(err, user);
    }
    console.log(accessToken, refreshToken, profile);
    user = new User({
      name: profile.displayName,
      email: _.get(profile, ['emails', '0', 'value']),
      username: profile.username, // || profile.emails[0].value.split('@')[0],
      provider: 'facebook',
      facebook: profile._json,
      roles: ['authenticated']
    });
    user.save(function(err) {
      if (err) {
        console.log(err);
        return done(null, false, {message: 'Facebook login failed, email already used by other login strategy'});
      } else {
        return done(err, user);
      }
    });
  });
}
));

// Use google strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENTID,
//   clientSecret: process.env.GOOGLE_CLIENTSECRET,
//   callbackURL: process.env.GOOGLE_CALLBACKURL
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOne({
//     'google.id': profile.id
//   }, function(err, user) {
//     if (user) {
//       return done(err, user);
//     }
//     user = new User({
//       name: profile.displayName,
//       email: profile.emails[0].value,
//       username: profile.emails[0].value,
//       provider: 'google',
//       google: profile._json,
//       roles: ['authenticated']
//     });
//     user.save(function(err) {
//       if (err) {
//         console.log(err);
//         return done(null, false, {message: 'Google login failed, email already used by other login strategy'});
//       } else {
//         return done(err, user);
//       }
//     });
//   });
// }
// ));

passport.use(new BearerStrategy(function(token, done) {
    auth.isVerify(token)
    .then(function(user) {
        done(null, user.toPassport());
    })
    .catch(function(err) {
        done(null, false);
    });
}));

module.exports = passport;
