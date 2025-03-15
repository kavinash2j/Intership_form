const mongoose = require("mongoose");

let formschema = mongoose.Schema({
    name : String,
    email_id : String,
    MobileNumber : Number,
    date : String,
    message : String,
})

let form = mongoose.Model("form",formschema);

module.exports = form;