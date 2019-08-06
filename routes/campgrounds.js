const express = require("express");
const mongoose = require("mongoose");

const Campground = require("../models/campground.js");
let middleware = require("../middleware/index.js");

let router = express.Router();


router.get("/", (req, res) => {
    // res.render("index.ejs", {ca: campgrounds}); // if we had just an array in RAM

    Campground.find({}, (err, camps) => {
        if(err){
            console.log("Oh, no, error");
            console.log(err);
        } else {
            res.render("campgrounds/index.ejs", {ca: camps});
        }
    });
});


router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
});


router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let price = req.body.price;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {"name": name, "image": image, "description": desc, "author": author, "price": price}
    
    Campground.create(newCampground, (err, camppp) => {
        if(err){
            console.log(err);
        } else {
            console.log("worksssssssss");
            console.log(camppp);
        }
    });
    
    res.redirect("campgrounds");
});




router.get("/:id", (req, res) => { // this route must be after /campgrounds/new because you know why
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err || !foundCampground);
            res.redirect("back");
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show.ejs", {campground: foundCampground});
        }
    });
});



router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err || !foundCampground);
        } else {
            res.render("campgrounds/edit.ejs", {campground: foundCampground});
        }
    });
});



mongoose.set('useFindAndModify', false); // in order to work the depricated function "findByIdAndUpdate()"
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // req.body.campground.body = req.sanitize(req.body.campground.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err || !updatedCampground) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});



router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



// function checkCampgroundOwnership(req, res, next){
//     if (req.isAuthenticated()) {
//         Campground.findById(req.params.id, (err, foundCampground) => {
//             if (err) {
//                 res.redirect("back");
//             } else {
//                 if (foundCampground.author.id == undefined) {
//                     if (req.user._id == "5d453f36b3b8b336944db70e") {
//                         return next();
//                     } else {
//                         res.redirect("back");
//                         return
//                     }
//                 }
//                 if (foundCampground.author.id.equals(req.user._id)) {
//                     return next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         console.log("non-authenticated user trying to edit post");
//         res.redirect("back");
//     }
// }



// function isLoggedIn(req, res, next){
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect("/login");
//     }
// }


module.exports = router;