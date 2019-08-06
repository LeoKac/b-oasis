const mongoose = require("mongoose");
let Campground = require("./models/campground.js");
let Comment = require("./models/comment.js");


let data = [
    {
        name: "Cloud's Rest",
        image: "https://img1.goodfon.com/wallpaper/nbig/0/39/les-art-noch-derevya-magiya.jpg",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        name: "Desert Mesa",
        image: "http://animalsbirds.com/wp-content/uploads/2016/07/chicken-nature-free-hd-wallpapers.jpg",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    },
    {
        name: "Canyon Floor",
        image: "https://cdn3.vitalfarms.com/wp-content/uploads/2016/10/winterlight2.jpg",
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    }
];


let comm = {
    text: "This place is greate, I wish there was internet",
    author: "Homer"
};



function seedDB(){
    // Campground.deleteMany({}, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("removed campgrounds");
    //     }
    // });
    
    data.forEach((seed) => {
        Campground.create(seed, (err, campgr) => {
            if (err) {
                console.log(err);
            } else {
                console.log("added a campground");
                Comment.create(comm, (err, comment) => {
                    if (err) {
                        console.log(err);
                    } else {
                        campgr.comments.push(comment);
                        campgr.save();
                        console.log("created new comment");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;