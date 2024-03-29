import React, { useState } from 'react'

const Dropdown = ({selected,setSelected,options,hostedZones,setSelectedzone=undefined}) => {
    const [isActive,setIsActive] =useState(false);
    

    console.log(hostedZones);

  return (
    <>
        <div className='dropdown' >
            <div className='dropdown-btn' onClick={e=>setIsActive(!isActive)}>{selected}
            <span className='fas fa-caret-down'></span>
            </div>
            {isActive && <div className='dropdown-content'>
            {
               options!=undefined? options.map((option,index)=>(
                    <div onClick={(e)=>
                        {setIsActive(false);
                        setSelected(e.target.textContent)
                        
                        }}
                         className='dropdown-item'>{option} </div>  
                ))
                :
                hostedZones.map((option,index)=>(
                    <div onClick={(e)=>
                        {setIsActive(false);
                        setSelected(e.target.textContent)
                        setSelectedzone(option)
                        }}
                         className='dropdown-item'>{option.Name} </div>  
                ))
            }
            </div>
            }
        </div>
    </>
  )
}

export default Dropdown
