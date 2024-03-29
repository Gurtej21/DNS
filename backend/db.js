
const mongoose= require('mongoose');
require('dotenv').config();
const newrul=process.env.Database;

const database= ()=>{
     mongoose.connect(newrul).then(
        ()=>{
        console.log("Database connected........");
    })
    .catch((err) =>{
        console.log("no connection");
    })   
}

module.exports=database;