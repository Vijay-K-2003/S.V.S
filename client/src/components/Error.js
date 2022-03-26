import React from 'react'
import { useSearchParams } from 'react-router-dom';
import '../css/Error.css'

const Error = () => {
const [searchParams] = useSearchParams();
    const error = searchParams.get('error');
    
  return (
    <div className='main-div-e'>
        
        <h1 className='main-message'>{error}</h1>
        <h3 className='sub-message'>Although you can go back to home and continue...</h3>
        <a href="/" className='home-btn-e'>Back To Home</a>
    </div>
  )
}

export default Error