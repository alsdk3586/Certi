import React, { useState } from "react";
import { BsStar, BsStarFill } from 'react-icons/bs';

export default function BtnStar({state}) {
  const [isFilled, setIsFilled] = useState(state);
  function getIsFilled(){
    setIsFilled(!isFilled);
  }
  
  if (isFilled) {
    return (
      <BsStarFill className="ml-2 my-auto" onClick={getIsFilled} size={20}
        style={{color:"#FCBE32"}}
      />
      );
  } else {
    return (<BsStar className="ml-2 my-auto" onClick={getIsFilled} size={20}/>);
  }
}
