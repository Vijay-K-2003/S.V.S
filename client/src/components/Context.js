import React, {createContext, useEffect, useState} from 'react'
import axios from "axios";

const initialState = {
    username: "",
    email: "",
    };

   export const myContext = createContext({});
const Context = (props) => {

    const [user, setUser] = useState(initialState);

    useEffect(() => {
     const getUser = async() => {
    
     const res =  await axios.get("https://smart-vendor1.herokuapp.com/getUser", {withCredentials: true});
     console.log(res.data);
      setUser(res.data);
     }
     getUser();
    }, [])
  
  
  return (
      <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}

export default Context

