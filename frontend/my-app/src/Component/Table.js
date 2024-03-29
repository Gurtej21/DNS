import React, { useState ,useEffect} from 'react'
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Loading from "../Component/Spinner"
import Modal from "./Modal";


const Table = (record) => {
    const[modalOpen,setmodalOpen] = useState(false);
    const[loading,setloading]=useState(false);
    const editRow=()=>{
        setmodalOpen(true);
    }
    
    
    
    
    const deleteRow=async(detail)=>{
      
      try {
        setloading(true);
        const response = await fetch('https://dns-manager-system-4.onrender.com/api/sub-domain/',{
          method:"DELETE",
          headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({Id:detail.props.HostedZoneId, recordName:detail.props.Name, recordType:detail.props.Type, ttl:detail.props.TTL,
              recordValue:detail.props.ResourceRecords[0].Value})
        });
        if (!response.ok) {
          throw new Error('Failed to fetch hosted zones');
        }
        const data = await response.json();
        console.log(data);
        window.alert("Deleted Successfully");
      } catch (error) {
        console.error('Error fetching hosted zones:', error);
        window.alert("Failed to Delete ",error.message);
      }
      record.fetchRecords();
      setloading(false);
    }

    const handleStateChange =() => {
      setmodalOpen(false);

    };
    

  return (
    <>
   {modalOpen &&  <Modal record={record} onStateChange={handleStateChange} fetchRecords={record.fetchRecords}/>}
            <tr key={record._id}>
              <td>{record.props.Name}</td>
              <td>{record.props.Type}</td>
              <td>{record.props.TTL}</td>
              <td className='resourcerecord'>
          {record.props.ResourceRecords.map((record, index) => (
            <span key={index}>{record.Value}</span>
          ))}
          
        </td>
              <td className='actions'>{loading && <Loading/>}
              <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(record)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow()}
                    />
              </td>
            </tr>
            
    </>
  )
}

export default Table
