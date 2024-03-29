
const express= require("express");
require('dotenv').config();
const bcrypt=require('bcryptjs');
const User=require('../modals/user');
const jwt=require('jsonwebtoken');
const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET
console.log("JWT_SECRET ", JWT_SECRET);

router.post('/create', async (req,res)=>{
   
   
    try{

    
    console.log(req.body);
    let user=await User.findOne({email:req.body.email});
    
    if(user){
        return res.status(400).json("Email id already exist");
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
  
    user = await   User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
     
      })
      
      console.log(user);
      return res.status(200).json("success");
    
    }
    catch(errors){
        console.error(errors.message);
      return  res.status(500).json("User not created");
    }
 
})


// Login user 

router.post('/login',  async (req,res)=>{
 
  
  try{

    const {email,password}=req.body;
    
  let user=await User.findOne({email});
  if(!user){
    return res.json("Wrong credentials");}

    let passcmp= await bcrypt.compare(password,user.password);
    if(!passcmp){
      return res.json("Wrong credential");
    }
    
    const data={
      user:{
        id: user._id
      }
    }
    var token = jwt.sign(data, JWT_SECRET);
  
  return res.status(200).json({ success: true, token }); 
   
  }
  catch(errors){
      console.error(errors.message);
      res.status(500).json("Some error found");
  }

})


module.exports=router;