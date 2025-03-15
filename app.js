const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const user_form = require("./schema_modules/form.js");
const ejs_mate = require("ejs-mate");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/form");
}
main().then(()=>{
    console.log("Database connection sucessfully");
}).catch((err)=>{
    console.log("there is error in the DB connection");
})


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejs_mate);

app.use("/fill_form",(req,res)=>{
    res.render("form.ejs")
})
app.post("internship-form",(req,res)=>{

})
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(8080,()=>{
    console.log("app is listing on the port 8080");
})