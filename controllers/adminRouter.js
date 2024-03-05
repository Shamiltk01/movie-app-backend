const express=require("express")
const adminModel=require("../models/adminModel")

const router=express.Router()

//admin signin
// router.post("/signin",async(req,res)=>{
//   try {
//     let username=req.body.adminUserName
//     let inputPass=req.body.adminPass
//     let data=await adminModel.findOne({adminUserName:username})
//     if(!data){
//       return(res.json({
//         status:"no user found"
//       }))
//     }
//     let dbPass=data.adminPass
//     if(dbPass!== inputPass){
//       return(res.json({
//         status:"incorrect password"
//       }))
//     }else{
//       res.json({
//         status:"success"
//       })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       status:"error",
//       message:"somthing went wrong in adminsignin."
//     })
//   }
// })

module.exports=router