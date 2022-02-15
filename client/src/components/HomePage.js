import React, { useContext } from "react";
import { myContext } from "./Context";

const HomePage = () => {
  const context = useContext(myContext);
  return (
    <div>
      {context ? (
        <h1>Welcome, {context.username}</h1>
      ) : (
        <h1>Welcome to our website</h1>
      )}
    </div>
  );
};

export default HomePage;
