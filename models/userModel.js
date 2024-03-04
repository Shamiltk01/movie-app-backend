const mongoose=require("mongoose")


const userModel=new mongoose.Schema({
    logname:{
        type:String,
        required:true
    },
    logemail:{
        type:String,
        required:true
    },
    logpass:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("users",userModel)