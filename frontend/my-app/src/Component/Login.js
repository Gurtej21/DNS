import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import Navbar from "../Component/Navbar"
import Loading from "../Component/Spinner"
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const Login = () => {

  
  let navigate=useNavigate();
  const[loading,setloading]=useState(false);
  
  const [type,updatetype]=useState("password");
  const [credentials,setcredentials]=useState({email:"",password:""});


const setDetail=(e)=>{
  setcredentials({...credentials,[e.target.name]:e.target.value});
}

const onsubmit= async(e)=>{
  e.preventDefault();
  setloading(true);
  try{
    const response=await fetch("https://dns-manager-system-4.onrender.com/api/user/login",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify({email:credentials.email, password:credentials.password})
      });
      const json= await response.json();
      localStorage.setItem("token",json.token);
      console.log(json);
    if(response.ok)
  {
      navigate("/add-domain");
  }
  else
  window.alert("Wrong Credentials. Please try again...");      
        
    }
    catch(err){
      window.alert("Wrong Credentials. Please try again...");      
    }
    setcredentials({email:"",password:""});
    setloading(false);
  
  
  }
  document.title = "LogIn";
 
  
  return (  
    <>
  <Navbar/>
        <div className="container">
        <div className="header">
        <div className='text'>Login</div>
        <div className='underline'></div>
        {loading && <Loading/>}

        </div>
        <form onSubmit={onsubmit} className='inputs'>
        
        <div className='input'>
            {/* <img src={email_icon}/> */}
            <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={setDetail} />
        </div>   
          
        <div className='input'>
            <img src={password_icon}/>
            <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={setDetail} />
        </div>   
        <span>Not Register?<Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link></span>
        <div className='submit-container'>
        <button type="submit" className='submit' disabled={credentials.email==="" || credentials.password===""} >Login</button>
            
        </div>
        </form>

            </div>
              
    </>
  )
}


export default Login;