import React  from "react";

const Message=({message})=>{
    return (
        <div className="row">
            {message?<div>{message}</div>:<></>}
        </div>
    )
}

export default Message;