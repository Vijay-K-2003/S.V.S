import React from 'react'
import { useSearchParams } from 'react-router-dom';
import FlashMessage from "react-flash-message";
import '../css/Flash.css';

const Flash = () => {
const [searchParams] = useSearchParams();
    const flash = searchParams.get('flash');
    
  return (
    <div>

    <FlashMessage duration={5000}>
      <div className='main-flash'>
        <div className='flash-message'>{flash}</div>
        <div className='flash-message'>Please click <a href="/">here</a> to continue...</div>
        </div>
    </FlashMessage>
    </div>
  )
}

export default Flash
