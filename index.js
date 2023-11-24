const express = require("express");
const env = require("dotenv").config();
const { connectMongoose, User } = require("./db/connect");
const passport = require("passport");
const { googleInitilizingPassport } = require("./googlePassportConfig");
const { initilizingPassport, isAuthenticate } = require("./passportConfig");
const expressSession = require("express-session");
const ejs = require("ejs");

const app = express();

const PORT = 3000 || process.env.PORT;

connectMongoose();

initilizingPassport(passport);
googleInitilizingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/success", (req, res)=>{
    res.render("profile");
});

app.get("/register", (req, res) => {
    res.render("register");
})



app.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/google/callback',
    passport.authenticate('google',
        {
            successRedirect: '/success',
            failureRedirect: '/google/failure'
        }
    )
);




app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });


        if (user) {
            res.status(400).send("User already Exists!");
        }

        const newUser = await User.create(req.body);
        console.log(newUser);

        res.status(201).send(newUser);
    }
    catch (error) {
        console.log(error);
    }
});

app.post("/login", passport.authenticate("local", {
    failureRedirect: "/register"
}), (req, res) => {
    res.redirect('/profile');
})

app.get("/profile", isAuthenticate, (req, res) => {
    res.render("profile");
})


app.get('/logout', function(req, res, next) {
    console.log(req.session);
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });



app.listen(PORT, () => {
    console.log("You are listening the port: ", PORT);
})