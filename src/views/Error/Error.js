import React from 'react';
// import './signup.css';
import {
  useLocation
} from "react-router-dom";


function Error() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default Error;
