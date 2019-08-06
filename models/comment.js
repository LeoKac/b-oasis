const mongoose = require("mongoose");



const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const commentSchema = new Schema({
//   aauthor: ObjectId,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

let Comment = mongoose.model("Comment", commentSchema); //in quotes it is the name of the collection

module.exports = Comment;