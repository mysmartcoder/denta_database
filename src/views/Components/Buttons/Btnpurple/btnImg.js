import React from 'react';

const ButtonImg = ( props ) => {
    return (
      <button className={`btn btn-c-purple btn-with-img ${props.styleClass}`} onClick={(e)=>{ e.preventDefault(); props.onClick()}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="21.332" height="21.332" viewBox="0 0 21.332 21.332">
        <path id="more" d={props.dimention} transform={props.translate} fill={props.fill}/>
      </svg>
      <span className="show-on-hover"> {props.value}</span>
      </button>
    );
  };
export default ButtonImg;




