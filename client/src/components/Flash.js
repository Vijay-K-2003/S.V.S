import React from 'react'
import { useSearchParams } from 'react-router-dom';
import FlashMessage from "react-flash-message";

const Flash = () => {
const [searchParams] = useSearchParams();
    const flash = searchParams.get('flash');
    
  return (
    <div>
      <a href="/">Home</a>
    <FlashMessage duration={5000}>
        <div>{flash}</div>
    </FlashMessage>
    </div>
  )
}

export default Flash
