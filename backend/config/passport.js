const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'mock_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_client_secret',
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ oauthId: profile.id, provider: 'google' });
        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                profilePicture: profile.photos?.[0]?.value,
                provider: 'google',
                oauthId: profile.id
            });
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'mock_github_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock_github_secret',
    callbackURL: "/api/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ oauthId: profile.id, provider: 'github' });
        if (!user) {
            user = await User.create({
                name: profile.displayName || profile.username,
                email: profile.emails?.[0]?.value,
                profilePicture: profile.photos?.[0]?.value,
                provider: 'github',
                oauthId: profile.id
            });
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
