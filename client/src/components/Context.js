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
      axios.get("http://localhost:4000/getUser", {withCredentials: true})
      .then((res) => {
          console.log(res.data);
         setUser(res.data);
      })
      .catch((e) => {
          console.log("Error in accessing users data");
      })
    }, [])
    
  return (
      <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}

export default Context