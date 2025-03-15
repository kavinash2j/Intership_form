const mongoose = require("mongoose");

let formschema = mongoose.Schema({
    name : String,
    email : String,
    mobNum : Number,
    date : String,
    education:String,
    skills:String,
    resume : mongoose.Schema.Types.ObjectId,
    message : String,
})

let form = mongoose.model("form",formschema);

module.exports = form