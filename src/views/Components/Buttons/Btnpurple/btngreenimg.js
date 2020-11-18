import React from 'react';

const ButtonImg = ( props ) => {
    return (
      <button className={`btn btn-c-green btn-with-img ${props.styleClass}`} onClick={(e)=>{ e.preventDefault(); props.onClick()}}>
       <span className="show-on-hover mr-2"> {props.value}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="21.332" height="21.332" viewBox="0 0 21.332 21.332">
        <path id="more" d={props.dimention} transform={props.translate} fill={props.fill}/>
      </svg>
     
      </button>
    );
  };
export default ButtonImg;