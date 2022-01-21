const mongoose= require("mongoose");

const dataSchema= new mongoose.Schema({
    name:{type:String,required:true},
    photo_url:{type:String,required:true},
    description:{type:String,required:true}
})

const Data = mongoose.model("data", dataSchema);

module.exports= Data;