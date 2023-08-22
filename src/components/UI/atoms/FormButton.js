import React from "react";

const FormButton = ({onClick,title,style={}}) => {
  return(
    <div id="button" className="row" style={{...style}}>
      <button onClick={onClick}>{title}</button>
    </div>
  )
};

export default FormButton;