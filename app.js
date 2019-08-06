// npm init
// installed (with --save) express, ejs, body-parser, mongoose (and mongo in OS deep folders)
// also (with --save) passport, passport-local, passport-local-mongoose, express-session
// also (with --save) method-override
// also (with --save) connect-flash

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
const es = require("express-session");
const methodOverride = require("method-override");
const flash = require("connect-flash");


let seedDB = require("./seeds.js");

// let Campground = require("./models/campground.js");
// let Comment = require("./models/comment.js");
let User = require("./models/user.js");



let commentRoutes = require("./routes/comments.js");
let campgroundRoutes = require("./routes/campgrounds.js");
let indexRoutes = require("./routes/index.js");



mongoose.connect('mongodb+srv://dbLeodevbro:gurji@gettingstarted-fjyxk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log("error: ", err.message);
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbLeodevbro:gurji@gettingstarted-fjyxk.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     if (err) {
//         console.log(err.message);
//     }
    
// //   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });








app.use(flash());


app.set("view engine", "ejs"); // or without this line at all, you know
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));



// seedDB();



let obj1 = {
    secret: "Rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
}
app.use(es(obj1));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});






app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);




app.listen(process.env.PORT || 5000, () => {
    console.log("YelpCamp started");
});