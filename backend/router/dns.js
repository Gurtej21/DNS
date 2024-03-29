
const express= require("express");
const bcrypt=require('bcryptjs');
const User=require('../modals/user');
const jwt=require('jsonwebtoken');
const router=express.Router();

const JWT_SECRET=process.env.JWT_SECRET;

console.log("Gautam KJ");

router.post('/add-hostedzone', async (req,res)=>{
   
   
    try{
        const hostedZone = req.body.hostedzone;
        const authToken=req.cookies.get('authToken')?.value;
    
        const data=jwt.verify(authToken,JWT_SECRET);
    
        const user=await User.findOne({_id:data._id});
        user.hostedzone.push(hostedZone);
        await user.save();
        res.json(user);
    
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
 
})




module.exports=router;