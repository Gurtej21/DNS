import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import Navbar from "../Component/Navbar"
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import Loading from "../Component/Spinner"

const Signup = () => {    
    let navigate=useNavigate();
    const [credentials,setcredentials]=useState({name:"",email:"",password:""});
    const[loading,setloading]=useState(false);
    

const setDetail=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }

const onsubmit= async(e)=>{
    e.preventDefault();
   setloading(true);
    try{
    const response=await fetch("https://dns-manager-system-4.onrender.com/api/user/create",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify({name:credentials.name , email:credentials.email, password:credentials.password})
      });
      const json= await response.json();

        console.log(json,+"\n" +response);
      if(response.ok)
      {
        window.alert("Succesfully created");
            navigate("/login");
      }
      else
        window.alert("User not created");
        
    }
    catch(err){
        window.alert("User not created");
    }
    setloading(false);
    setcredentials({name:"",email:"",password:""});
      
    
}



    

  return (
    <>
    <Navbar/>

        <div className="container">
        <div className="header">
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
            {loading && <Loading/>}
        </div>
        <form onSubmit={onsubmit} className='inputs'>
        <div className='input'>
            <img src={user_icon}/>
            <input type="text" placeholder="Name" name="name" onChange={setDetail} minLength={3} value={credentials.name}  />
        </div>  
        <div className='input'>
            <img src={email_icon}/>
            <input type="email" placeholder="Email" name="email"  value={credentials.email} onChange={setDetail} />
        </div>   
          
        <div className='input'>
            <img src={password_icon}/>
            <input type="password" placeholder="Password" name="password" minLength={3} value={credentials.password} onChange={setDetail} />
        </div>   
        <span> Already Register?<Link to="/login" style={{ textDecoration: "none" }}>Login</Link></span>
        <div className='submit-container'>
            
            <button type="submit" className='submit' disabled={credentials.email==="" || credentials.password==="" || credentials.name===""}  >Sign up</button>
            
        </div>
        </form>

            </div>
                  



</>
  )
}






export default Signup;