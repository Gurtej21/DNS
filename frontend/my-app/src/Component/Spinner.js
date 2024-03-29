import React, { Component } from 'react'
import loading from '../Assets/load.gif'


export class Spinner extends Component {
  render() {
    return (
      <div className='text-center mb-3'>
          <img src={loading} alt='loading'></img>
        
        
        
      </div>
    )
  }
}

export default Spinner
