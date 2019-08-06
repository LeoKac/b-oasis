const express = require("express");
const mongoose = require("mongoose");

let Campground = require("../models/campground.js");
let Comment = require("../models/comment.js");
let middleware = require("../middleware/index.js");


let router = express.Router({mergeParams: true});


router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || !campground) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});


router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || !campground) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfuly added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});



router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, cg) => {
        if (err || !cg) {
            req.flash("error", "No campground found");
            return res.redirect("back");
        } else{
            Comment.findById(req.params.comment_id, (err, comm) => {
                if (err || !comm) {
                    req.flash("error", "No comment found");
                    return res.redirect("back");
                } else{
                    res.render("comments/edit.ejs", {campground_id: cg._id, campground_name: cg.name, comment: comm});
                }
            });
        }
    });
});




mongoose.set('useFindAndModify', false); // in order to work the depricated function "findByIdAndUpdate()"
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedcomment) => {
        if (err || !updatedcomment) {
            req.flash("error", "No comment found");
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});



router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err || !req.params.comment_id) {
            req.flash("error", "No comment found");
            res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



// function checkCommentOwnership(req, res, next){
//     if (req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, (err, foundComment) => {
//             if (err) {
//                 res.redirect("back");
//             } else {
//                 if (foundComment.author.id == undefined) {
//                     if (req.user._id == "5d453f36b3b8b336944db70e") {
//                         return next();
//                     } else {
//                         res.redirect("back");
//                         return
//                     }
//                 }
//                 if (foundComment.author.id.equals(req.user._id)) {
//                     return next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else {
//         console.log("non-authenticated user trying to edit comment");
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