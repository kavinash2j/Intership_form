const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const user_form = require("./schema_modules/form.js");
const ejs_mate = require("ejs-mate");
const expressError = require("./util/expressError.js");
const wrapAsync = require("./util/wrapAsync.js");
const method_overriden = require("method-override");


async function main() {
    await mongoose.connect("mongodb+srv://kshirsagaravi2151:22310161@cluster0.s7mxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    mongoose.connection.useDb("form"); 
}
main().then(()=>{
    console.log("Database connection sucessfully");
}).catch((err)=>{
    console.log("there is error in the DB connection");
})


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(method_overriden("_method"))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejs_mate);



app.post("/fill_form/submit",wrapAsync(async(req,res)=>{
    let userbody = req.body;
    // console.log(hello);
    let user = new user_form(userbody);
    user.save().then(()=>{
        res.render("thank.ejs")
    });
}))
app.get("/fill_form",(req,res)=>{
    try {
        res.render("form.ejs")
    } catch (error) {
        throw new expressError(error);
    }
})
app.get("/",(req,res)=>{
    try {
        res.render("index.ejs");
    } catch (error) {
        throw new expressError(error);
    }
})

app.get("/view/application",wrapAsync(async(req,res)=>{
    let temp = await user_form.find();
    res.render("application.ejs",{temp});
}))
app.delete("/delete_form/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let de_user = await user_form.findByIdAndDelete(id);
    console.log(de_user);
    res.redirect("/view/application")
}))

app.use((err,req,res,next)=>{
    let {status = 500,message="something went wrong"} = err;
    console.log(message);
    res.status(status).send(message);
})
app.listen(8080,()=>{
    console.log("app is listing on the port 8080");
})