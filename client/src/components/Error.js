import React from 'react'
import { useSearchParams } from 'react-router-dom';

const Error = () => {
const [searchParams] = useSearchParams();
    const error = searchParams.get('error');
    
  return (
    <div>
        <h1>Error Template</h1>
        <h3>{error}</h3>
    </div>
  )
}

export default Error