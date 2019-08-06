const Campground = require("../models/campground.js");
let Comment = require("../models/comment.js");


let middlewareObj = {};


middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash("error", "Item not found.");
                res.redirect("back");
            } else {
                if (foundCampground.author.id == undefined) {
                    if (req.user._id == "5d468f4d98872920a8c0c826") {
                        return next();
                    } else {
                        res.redirect("back");
                        return
                    }
                }
                if (foundCampground.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("non-authenticated user trying to edit post");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                req.flash("error", "comment not found");
                res.redirect("back");
                return
            } else {
                if (foundComment.author.id == undefined) {
                    if (req.user._id == "5d468f4d98872920a8c0c826") {
                        return next();
                    } else {
                        req.flash("error", "You are not the owner of this comment");
                        res.redirect("back");
                        return
                    }
                }
                if (foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You are not the owner of this comment");
                    res.redirect("back");
                    return
                }
            }
        });
    } else {
        console.log("non-authenticated user trying to edit comment");
        req.flash("error", "You need to Login");
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
}



module.exports = middlewareObj;