const express=require('express');
const database = require('./db');
const cookieParser = require("cookie-parser");
var cors = require('cors');
const path=require('path');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cookieParser());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const PORT= process.env.PORT || 5000;


// https://master--dns-managersys.netlify.app/

app.use(cors());

database();

app.use("/api/user",require("./router/user"));
app.use("/api/hosted-zone",require("./router/hostedzone"));
app.use("/api/sub-domain",require("./router/subdomain"));

app.get('/',(req,res)=>{
    res.send("Server is working");
})

app.use(express.static(path.join(__dirname,  'build')));
console.log(path.join(__dirname, '../frontend/my-app', 'build'));

app.listen(PORT, function () {
 
    console.log("App listening at http://localhost:",PORT);
 })
 