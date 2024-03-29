import React, { useState,useEffect } from 'react'
import Navbar from "../Component/Navbar"
import Loading from "../Component/Spinner"
import domain_icon from '../Assets/domain_icon.png'
import value_icon from '../Assets/value_icon.png'
import url_icon from '../Assets/www_icon.png'
import Dropdown from '../Component/Dropdown'

const AddDomain = () => {
    document.title='Add Domain';
    
    const [file, setFile] = useState({ preview: "", raw: "" });
    const[loading,setloading]=useState(false);
    const[selected,setSelected] = useState("Select Hosted Zone");
    const [zonename,setZonename]=useState(null);
    const [selectedzone,setSelectedzone] = useState(null);
    const [fileName,setFileName]=useState(null);
    
    
    const [hostedZones, setHostedZones] = useState([]);
    const [formData, setFormData] = useState({
        Id: '',
        recordName: '',
        recordType: '',
        recordValue: '',
        ttl: ''
      });
      const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  useEffect(() => {
    fetchHostedZones();
  }, []);

  const handleChange = (e) => {
    setZonename(e.target.value);
  }
  
      const handleFileChosen = (e) => {

        if (e.target.files.length) {
          const selectedFile = e.target.files[0];
          setFileName(e.target.files[0]);
        
          setFile({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
          });
          }
          console.log("Image ",file.preview+"	"+file.raw);
      };

    // Get hosted zone information
    const fetchHostedZones = async () => {
      
      
        try {
          const response = await fetch('https://dns-manager-system-4.onrender.com/api/hosted-zone/list',{
            method:"GET",
            headers:{
                'content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
              },
          });
          if (!response.ok) {
            window.alert("Failed to fetch hosted zones");
            throw new Error('Failed to fetch hosted zones');
            
          }
          const data = await response.json();
          
          setHostedZones(data);
        } catch (error) {
          console.error('Error fetching hosted zones:', error);
        }
      };


    // create hosted zone 

    const createHostedZone = async (name) => {
      if(name==null)
          return;
        try {
          setloading(true);
          const response = await fetch('https://dns-manager-system-4.onrender.com/api/hosted-zone/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ name}),
          });
          
          const data = await response.json();
          if(response.ok){
          setHostedZones(data.hostedzone);
          window.alert("Hosted zone created");
          }
          else{
            window.alert(data);
          }

        } catch (error) {
          console.error('Error creating hosted zone:', error);
          window.alert(error);
        }
        setloading(false);
      };

      const onsubmitzone=async (e) => {
        e.preventDefault();
        await createHostedZone(zonename);
        setZonename('');
      }

      // bulk data
      const onsubmit=async(e)=>
      {
        e.preventDefault();
        setFileName(null);
        if(selectedzone==null)
        {
            window.alert("Please Select Hosted Zone");
            return;
        }
        
        setloading(true);

        try {
            const formData = new FormData();
            formData.append("uploadedfile", file.raw);
            formData.append("hostedZoneId", selectedzone.HostedZoneId); 
            
            const response = await fetch("https://dns-manager-system-4.onrender.com/api/sub-domain/dns", {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                // Handle success response
                const json = await response.json();
                console.log(json); // Log or handle the response data
                window.alert("Record Save Success");
            } else {
                // Handle error response
                console.error('Failed to upload image:', response.status, response.statusText);
                window.alert("Some record could not be uploaded");
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
        
        setloading(false);

      }


    // add record to hosted zone

    const handleSubmit = async (e) => {
      console.log("button click");
        e.preventDefault();

        
        
        if(selectedzone==null)
        {
            window.alert("Please Select Hosted Zone");
            return;
        }

        formData.Id = selectedzone.HostedZoneId;

        try {
          setloading(true);
          const response = await fetch('https://dns-manager-system-4.onrender.com/api/sub-domain/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'              
            },
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          console.log(data); // Log response from server
          if (response.ok) {
            
          
          window.alert("Record Save");
            
          }
          else{
            window.alert(data)
          }
    
          
        } catch (error) {
          console.error('Error:', error.message); // Log error message
          window.alert(error.message);
        }
        
        
        setFormData({Id: "",
        recordName: "",
        recordType: "",
        recordValue: "",
        ttl: ""})
        setloading(false);
      };




  return (
    <div>
      <Navbar/>

      <div class="home_container">
        
        
        <div class="home_box">
            <h4>Hosted zones</h4>
            {loading && <Loading/>}
            <form onSubmit={onsubmitzone} class="home_file1">
        
            <Dropdown selected={selected} setSelected={setSelected} options={undefined} hostedZones={hostedZones} setSelectedzone={setSelectedzone} /> 
              <span>OR</span>
            <input type="text" placeholder="Create Name of the domain that you want to route traffic for. (example.com)" onChange={handleChange} name="name" value={zonename} />
            <button type="submit" id="cbtn" className="home_addbtn" disabled={zonename === null }>Add Domain </button>

        
    </form>
            
    <h4>Create Record using JSON file</h4>
        <form onSubmit={onsubmit} class="home_file">
        
            <input type="file" class="home_file_input" name="uploadedfile" onChange={handleFileChosen} aria-describedby="inputGroupFileAddon03" aria-label="Upload" accept=".json, .csv"/>
            <button type="submit" id="cbtn" class="home_addbtn" disabled={file.raw === ""} >Add Records</button>
            
        </form>

        <h4>Create Record Individually</h4>
    <form onSubmit={handleSubmit} className='home_form'>
        <div className='home_input_box'>
        <div className='home_input'>
        <img src={domain_icon}/>
            <input type="text" placeholder="Domain" onChange={handleOnChange} value={formData.recordName} name="recordName"  />
        </div>   
          
        <div className='home_input'>
        <img src={url_icon}/>
            <input type="text" placeholder="RecordType" onChange={handleOnChange} value={formData.recordType} name="recordType"  />
        </div>  
        <div className='home_input'>
        <img src={domain_icon}/>
            <input type="text" placeholder="TTL" onChange={handleOnChange} value={formData.ttl} name="ttl"  />
        </div>   
        <div className='home_input'>
        <img src={value_icon}/>
            <input type="text" placeholder="Value" onChange={handleOnChange} value={formData.recordValue} name="recordValue"  />
        </div>  

        <div className='home_submit'>
            <button type='submit' className='home_submitbtn' disabled={formData.recordName==''||formData.recordType==''
            || formData.recordValue== ''|| formData.ttl== ''}>Add Record</button>
            
        </div>
        </div>
        </form>

    </div>
    </div>
    
    </div>
  )
}

export default AddDomain
