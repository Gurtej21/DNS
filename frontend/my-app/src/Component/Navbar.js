import React from 'react';

import {Link,useNavigate} from "react-router-dom";
import icon from '../Assets/domain_manger_icon.png';

const Navbar = () => {
  const val = localStorage.getItem('token');
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
    
  }

  return (
    <div className='nav_container'>
      <div className='icon'>
        <img src={icon} alt='DNS Manager Icon' width={50} height={50} />
        <h3 className='title'>DNS Manager</h3>
      </div>
      <ul className='links'>
        
       
        {
          val ? (
            <>
            <li>
             <Link to='/dashboard' style={{ textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li>
          <Link to='/add-domain' style={{ textDecoration: 'none' }}>Add Domain</Link>
        </li>
            </>
              
          ):null
        }
      </ul>

      <ul className='links'>
        {
          val ? (
            <li>
              <Link to='/login' onClick={logout} style={{ textDecoration: 'none' }}>Log out</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
              </li>
              <li>
                <Link to='/signup' style={{ textDecoration: 'none' }}>Sign up</Link>
              </li>
            </>
          )
        }
      </ul>
    </div>
  );
};

export default Navbar;
