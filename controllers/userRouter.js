const express=require("express")
const bcrypt=require("bcrypt")
const userModel=require("../models/userModel")
const adminModel = require("../models/adminModel")
const router=express.Router()

const hashFunction=async(pass)=>{
    let salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/signup", async (req, res) => {
    try {
        
        let inputPassword = req.body.logpass;
        let user = req.body.logemail;
        let username=req.body.logname
        let input=req.body
        
        
        // Find if the user already exists
        let data = await userModel.findOne({ logemail: user });
        
        if (data) {
            return res.json({
                status: "user already exists"
            });
        }
        
        // User doesn't exist, proceed with hashing password and saving user
        let hashedPass = await hashFunction(inputPassword);
        
        // Create a new user object with the provided data
        input.logpass=hashedPass
        let newUser=new userModel(input)
        
        await newUser.save();
        
        res.json({
            status: "success"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "something went wrong in user signup."
        });
    }
});

router.post("/signin",async(req,res)=>{
    try {
        let inputPass=req.body.logpass
        let inputEmail=req.body.logemail
        let data=await userModel.findOne({logemail:inputEmail})
        if(!data){
            let admindata=await adminModel.findOne({logemail:inputEmail})
            if(!admindata){
                return(res.json({
                    status:"no user found"
                }))
            }
            let dbPasswordAdmin=admindata.logpass
            if(inputPass !== dbPasswordAdmin){
                return(res.json({
                    status:"incorrect password"
                }))
            }else{
                return(res.json({
                    status:"success",
                    adminData:admindata
                }))
            }
        }
        let dbPassword=data.logpass
        let match=await bcrypt.compare(inputPass,dbPassword)
        if(!match){
            return(res.json({
                status:"password not match"
            }))
        }
        res.json({
            status:"success",
            userData:data
        })
        
    } catch (error) {
        console.error(error)
        res.json({
            status:"error",
            message:"somthing went wrong in user signin."
        })
    }
    
})

module.exports=router