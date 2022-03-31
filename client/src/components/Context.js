import React, {createContext, useEffect, useState} from 'react'
import axios from "axios";

// const initialState = {
//     username: "",
//     email: "",
//     };

   export const myContext = createContext({});
    const Context = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
     const getUser = async() => {
    
      const res =  await axios.get("http://localhost:4000/getUser", {withCredentials: true});
      console.log(res.data);
      setUser(res.data);
     }
     getUser();
     
    }, [])
  console.log(user);
  
  return (
      <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}

export default Context

