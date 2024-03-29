import React, { useState ,useEffect} from 'react'
import Navbar from "../Component/Navbar"
import Table from "./Table";
import Chart from "../Component/Chart";
import Dropdown from "../Component/Dropdown";
import Loading from "../Component/Spinner"



const Homepage = () => {
    
    document.title='Dashboard';
    const [dnsRecords, setDNSRecords] = useState([]);
    const[loading,setloading]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const[selected,setSelected] = useState("Name");
  const options = ["Name","Type"];
    const[typecnt,setTypecnt]=useState({'A': 0,'MX':0,'CNAME':0,'AAAA':0,'NS':0,'PTR':0,'SOA':0,'SRV':0,'TXT':0,'DNSSEC':0});

    
    useEffect(() => {
      // Reset type count
      setTypecnt({
        'A': 0,
        'MX': 0,
        'CNAME': 0,
        'AAAA': 0,
        'NS': 0,
        'PTR': 0,
        'SOA': 0,
        'SRV': 0,
        'TXT': 0,
        'DNSSEC': 0
      });
    
      // Update type count based on filtered records
      
      dnsRecords.forEach((record) => {
        
        setTypecnt(prev => ({
          ...prev,
          [record.Type]: prev[record.Type] + 1
        }));
      });
    
    }, [dnsRecords]);
    

  
  


    // fetch records
    useEffect(() => {
      const run =async()=>{

        await fetchRecords();
        console.log("dnsRecords",dnsRecords);
        
      }
      
      run();
      
      
    }, []);
     // Get hosted zone information
     const fetchRecords = async () => {
      try {
        setloading(true);
        const response = await fetch('https://dns-manager-system-4.onrender.com/api/sub-domain/list',{
          method:"GET",
          headers:{
              'content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch hosted zones');
        }
        const data = await response.json();
        console.log(data);
        setDNSRecords(data);
      } catch (error) {
        console.error('Error fetching hosted zones:', error);
      }
      setloading(false);
    };

      console.log('Fetching',dnsRecords);
    

  
  // Calculate the index of the last record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  // Calculate the index of the first record on the current page
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  

  // Filter records based on the search term
const filteredRecords = dnsRecords.filter((record) => {

  
 
  if (selected.trim() == "Name".trim()) {
    console.log("domain: ");
    return record.Name.toLowerCase().includes(searchTerm.toLowerCase());
  } else if (selected.trim() == "Type".trim()) {
    
    return record.Type.toLowerCase().includes(searchTerm.toLowerCase());
  }
  
  
  return false;
});


  // Get the records for the current page
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  console.log(currentRecords);

  // Pagination functions
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(Math.ceil(dnsRecords.length / recordsPerPage), prevPage + 1));
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);    
    setCurrentPage(1);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  console.log(dnsRecords.length + " records per page");



  return (
    <div>
      <Navbar/>
    <div className="dashboard">
      <div className="dns-records-table">
      <h3>DNS Records Table</h3>
      {loading && <Loading/>} 
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search by ${selected}`}
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <Dropdown selected={selected} setSelected={setSelected} options={options}/>
        <button className='move_btn' onClick={goToPreviousPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span className="page-number">{`Page ${totalPages<currentPage?0:currentPage} of ${totalPages}`}</span>
        <button className='move_btn'
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>TTL</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          { console.log("currentPage ",currentRecords) ||
          currentRecords.map((record) => { 
            return <Table  props={record} fetchRecords={fetchRecords}/>
            })
        }
        
        </tbody>
      </table>
    </div>
    </div>
    <Chart count={typecnt}/>
    </div>
  )
}

export default Homepage
