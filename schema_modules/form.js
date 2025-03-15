const mongoose = require("mongoose");

let formschema = mongoose.Schema({
    name : String,
    email_id : String,
    mobNum : Number,
    date : String,
    education:String,
    skills:String,
    resume : String,
    message : String,
})

let form = mongoose.model("form",formschema);

module.exports = form