import React, { useState } from "react";
import Loading from "../Component/Spinner"

const Modal = (props) => {

  console.log("props", props);
  
    
  const[loading,setloading]=useState(false);
const [detail,setdetail]=useState({Value:props.record.props.ResourceRecords[[0]].Value,TTL:props.record.props.TTL});

    console.log(props.record.props.ResourceRecords[0].Value);

const handleChange=(e)=>{
    console.log("handleChange");
    setdetail({...detail,[e.target.name]:e.target.value})

}

const handleSubmit=async (e)=>{
  e.preventDefault();
  try {
    setloading(true);
    const response = await fetch('https://dns-manager-system-4.onrender.com/api/sub-domain/update',{
      method:"PUT",
      headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({recordName:props.record.props.Name,recordType:props.record.props.Type,ttl:detail.TTL,Id:props.record.props.HostedZoneId,recordValue:detail.Value})
    });
    if (!response.ok) {
      throw new Error('Failed to fetch hosted zones');
    }
    const data = await response.json();
    console.log(data);
    window.alert("Updated Successfully");
  } catch (error) {
    console.error('Error fetching hosted zones:', error);
    window.alert("Failed to update ",error.message);
  }
    
  setloading(false);
    setdetail({Name:'',Type:'',TTL:''});
    props.record.fetchRecords();
    props.onStateChange();

    
}
  const cancelbtn=(e)=>{
    e.preventDefault();
    props.onStateChange();
  }


  return (
    <>
        
      <div className="modal-container">
      
        <div className="modal_box">
        {loading && <Loading/>}
        <h2>Edit</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="page">Name</label>
              <input
                type="text"
                name="Name"

                value={props.record.props.Name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="page">Type</label>
              <input
                type="text"
                name="Type"
                value={props.record.props.Type}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="page">TTL</label>
              <input
                type="text"
                name="TTL"
                value={detail.TTL}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="page">Value</label>
              <input
                type="text"
                name="Value"
                value={detail.Value}
                onChange={handleChange}
              />
            </div> */}
            <button type="submit" className="btn">
              Update
            </button>
            <button  onClick={cancelbtn} className="cncl_btn">
              Cancel
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default Modal;
