const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });
  
  const route53 = new AWS.Route53();
  

const express= require("express");
const User=require('../modals/user');
const jwt=require('jsonwebtoken');
const router=express.Router();

const JWT_SECRET=process.env.JWT_SECRET;

function generateUniqueString() {
    // Get current timestamp
    const timestamp = new Date().getTime();

    // Generate random component (6 characters)
    const randomString = Math.random().toString(36).substring(2, 8);

    // Concatenate timestamp and random component
    const uniqueString = `${timestamp}-${randomString}`;

    return uniqueString;
}
router.post('/create', async (req,res)=>{
   
   
    try{
        const name = req.body.name;
        const uniqueString = generateUniqueString();
        
        const params = {
            CallerReference: uniqueString, /* required */
            Name: name, /* required */
          };
          
          const hostedzone = await route53.createHostedZone(params).promise();

            console.log("Created hosted zone", hostedzone);
          
        const hostedZoneId = hostedzone.HostedZone.Id.split('/hostedzone/')[1];
        console.log(hostedZoneId);
        const token=req.header('auth-token');
    console.log("authToken: " + token);
        const data=jwt.decode(token);
        console.log("data" ,data);
          const user = await User.findOne({ _id: data.user.id });
          user.hostedzone.push({HostedZoneId:hostedZoneId,Name:name});
          await user.save();

          return res.status(200).json(user);
          
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json(errors.message);
    }
 
})


router.get('/list',async(req,res)=>{
    try{
      
      console.log(req.header);
      const token=req.header('auth-token');
      // const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMDY2YzZjOWI5MGI5MTkyY2M5ZmMxIn0sImlhdCI6MTcxMTMwMjk5OX0.2hEe7LNoI1QqY6tRAtpfim3WqQcgtXm32gqLSjBrZf0";
  console.log("authToken: " + token);
      const data=jwt.decode(token);
      console.log("data" ,data);
        const user = await User.findOne({ _id: data.user.id });
        console.log("user asdf",user);
        res.json(user.hostedzone);
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
})




module.exports=router;