# Passport.js With Node.js

I've implemented Passport.js as middleware for user authentication and authorization in this project. Passport.js simplifies the process of adding user authentication to web applications.

## Local Authentication (passport-local strategy)

I use `passport-local` for traditional username/password authentication, where user credentials are stored locally in my application's MongoDB database.

[GitHub Repository (main)](https://github.com/w3villa-vishal-maurya/passport-auth/tree/main)

## OAuth Authentication (passport-google-oauth2 strategy)

I've also integrated `passport-google-oauth2` strategy for direct login/signup through Google using your Google API credentials (YOUR_GOOGLE_CLIENT_ID and YOUR_GOOGLE_CLIENT_SECRET).

[GitHub Repository (Google Auth)](https://github.com/w3villa-vishal-maurya/passport-auth/tree/googleAuth)
