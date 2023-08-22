import React, {useRef,useEffect} from "react";
const FormInput = ({description,type,placeholder,name,handleChange,reset}) => {

  const inputEl = useRef(null);
  
  useEffect(() => {
    console.log(reset);
    inputEl.current.value = "";
  }, [reset]);

  return(
      <div className="row">
        <label>{description}</label>
        <input type={type} placeholder={placeholder} onChange={handleChange} name={name} ref={inputEl} />
      </div>
  )
}

export default FormInput;