const express=require("express")
const adminModel=require("../models/adminModel")
const userModel = require("../models/userModel")
const tempUserModel=require("../models/tempUserModel")

const router=express.Router()

//reject user request
router.put("/reject/:id",async(req,res)=>{
  try {
    let id=req.params.id
    await tempUserModel.findByIdAndDelete(id)
    res.json({
      status:"rejected successfully"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status:"error",
      message:"somthing went wrong in accept  user request."
    })
  }
})

//view all users that are pending
router.get("/viewallreq",async(req,res)=>{
  try {
    let data=await tempUserModel.find({status:false})
    res.json({
      status:"success",
      userData:data
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status:"error",
      message:"somthing went wrong in view all requests."
    })
  }
})

module.exports=router