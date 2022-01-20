const express= require("express");
const app=express();
const path= require("path")
require("./db/conn")
const port= process.env.PORT || 5550;
const hbs= require("hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const Register = require("./models/registers");
const async = require("hbs/lib/async");

const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path))
app.set("view engine","hbs");


app.get("/",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
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
app.get("/home_page",(req,res)=>{
    res.render("home_page")
})


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})