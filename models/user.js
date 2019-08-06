const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let UserSchema = new Schema({
//   aauthor: ObjectId,
    username: String,
    email: String,
    password: String
});


UserSchema.plugin(passportLocalMongoose);




let User = mongoose.model("User", UserSchema); //in quotes it is the name of the collection

module.exports = User;