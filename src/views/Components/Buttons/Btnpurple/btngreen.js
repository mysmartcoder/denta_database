import React from 'react';

const ButtonGreen = (props) => {
  // { styleClass, value,onClick }
    return (
      <button className={`btn btn-c-green ${props.styleClass}`} onClick={(e)=>{ e.preventDefault(); props.onClick()}}>
        {props.value}
      </button>
    );
  };
export default ButtonGreen;




