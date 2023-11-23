var GoogleStrategy = require('passport-google-oauth2').Strategy;
// const { connectMongoose, User } = require("./db/connect");

const googleInitilizingPassport = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, done) {
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(profile);
            return done(null, profile);
            // });
        }
    ));


    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser(async(user, done)=>{
        done(null, user);
    })
}

module.exports = {
    googleInitilizingPassport
}