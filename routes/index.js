const express = require("express");
const passport = require("passport");

let User = require("../models/user.js");

let router = express.Router();


router.get("/", (req, res) => {
    res.render("landing.ejs"); // also we can remove .ejs if -> app.set("view engine", "ejs");
});




router.get("/register", (req, res) => {
    res.render("register.ejs");
});



router.post("/register", (req, res) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("back");
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "You are registered, welcome here, " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});





router.get("/login", (req, res) => {
    res.render("login.ejs");
});



router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
    
});




router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You logged out");
    res.redirect("/");
});





module.exports = router;