var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function (err, user) {
        if (!user) {
          User.findOne({email: profile.emails[0].value}, function (err, user) {
            if (err) {
              done(err);
            }
            if (!user) {
              user = new User({
                name: profile.displayName,
                picture: profile._json.picture || profile._json.image.url.replace('?sz=50', '?sz=300'),
                email: profile.emails[0].value,
                role: 'user',
                provider: 'google',
                google: profile._json,
                socialLink: profile._json.link
              });
            } else {
              user.facebook = {};
              user.google = profile._json;
              user.picture = profile._json.picture || profile._json.image.url.replace('?sz=50', '?sz=300');
              user.provider = 'google';
              user.socialLink = profile._json.link;
            }
            user.save(function (err) {
              if (err) {
                return done(err);
              }
              return done(err, user);
            });
          });
        } else {
          user.google = profile._json;
          user.picture = profile._json.picture || profile._json.image.url.replace('?sz=50', '?sz=300');
          user.socialLink = profile._json.link;
          user.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(err, user);
          });
        }
      });
    }
  ));
};
