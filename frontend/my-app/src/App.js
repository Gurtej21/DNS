import './App.css';
import {BrowserRouter , Route,Routes} from "react-router-dom";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Homepage from './Component/Homepage';
import AddDomain from './Component/AddDomain';
import Modal from './Component/Modal';

function App() {
  return (
    <>
         <BrowserRouter>
         <Routes>
         < Route  path="/" element={<Login/>}/> 
         < Route  path="/login" element={<Login/>}/> 
         <Route path="/signup" element={<Signup/>}/> 
         <Route path="/dashboard" element={<Homepage/>}/>
         <Route path="/add-domain" element={<AddDomain/>}/>
         <Route path="/modal" element={<Modal/>}/>
         
         
         </Routes>

         </BrowserRouter>
    </>
  );
}

export default App;
