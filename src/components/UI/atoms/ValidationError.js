import React  from "react";

const FormValidation=({error})=>{
    return (
        <div className="row">
            {error?<div>{error}</div>:<></>}
        </div>
    )
}


export default FormValidation;