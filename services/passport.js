const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // We may have multiple OAuth, so use unique id.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Search id through User records
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      // fixing proxy issues regarding heroku
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // Already hav a record
        return done(null, existingUser);
      }
      // If existingUser === null
      // asynchronous action
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
