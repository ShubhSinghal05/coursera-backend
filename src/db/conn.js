const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shubh:Shubham@cluster0.87lcx.mongodb.net/test").then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err.message);
})