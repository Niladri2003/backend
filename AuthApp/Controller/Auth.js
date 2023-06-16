const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")

const User=require("../model/User");
const { options } = require('../routes/user');
require("dotenv").config();

//Singup router
exports.signup=async(req,res)=>{
    try{
        //get data
        const {name,email,role,password}=req.body;
        //check if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            })
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);

        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hasing password"
            })
        }

        //create entry to db
        const user=await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"User created succesfully"
        });

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"PLease try again later"

        });

    }
}

//Login

exports.login=async(req,res)=>{
    try{
        //data fetch
        const{email,password}=req.body;
        //validation
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Please fill form correctly"
            })
        }
        //check for registerd user
        let user=await User.findOne({email});
        //if not a registerd user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registerd",
            })
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password and generate jwt token 
        if(await bcrypt.compare(password,user.password)){
            //password match
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            });
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true

            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User login success"
            })



        }else{
            //password do not match
            return res.status(403).json({
                success:false,
                message:"Password incorrect"
            })
        }
       
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login failure"
        })

            
    }
}