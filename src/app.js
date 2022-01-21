const express= require("express");
const app=express();
const path= require("path")
const mongoose= require("mongoose");
require("./db/conn")
const port= process.env.PORT || 5550;
const hbs= require("hbs");
const Data= require("./models/data");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const Register = require("./models/registers");
const async = require("hbs/lib/async");

const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")

app.use(express.static(static_path))

app.set("view engine","hbs");
app.set("views",templates_path)

hbs.registerPartials(partials_path)

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/online_degrees",(req,res)=>{
    res.render("online_degrees")
})

app.get("/find_careers",(req,res)=>{
    try {
        res.render("find_careers")
        
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/home_page",(req,res)=>{
    res.render("home_page")
})
app.get("/data",async (req,res)=>{
    try{
        let courses= await Data.find().lean().exec();
        res.status(200).send(courses);

    }catch (error) {
        res.status(500).json(error.message)
    }
})


app.post("/register", async(req,res)=>{
    try {
       const mainData= new Register({
           name:req.body.name,
           email:req.body.email,
           password:req.body.password
       })

       const registered= await mainData.save();
       res.status(200).render("login")
    } catch (error) {
        res.status(400).send(error.message);
    }
})
app.get("/",(req,res)=>{
    res.render("home_page")
})


app.listen(port,()=>{
    console.log(`server running at ${port}`)
})