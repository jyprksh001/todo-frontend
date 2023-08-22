import React from "react";

import { Button} from "react-bootstrap";

const TaskHeader = ({handleTask})=>{
    return ( 
        <div style={{position:'relative',display: 'block',top: "50px"}}>
            <span style={{ position:'relative', marginLeft:'10px' }}>Tasks</span>
            <Button onClick={handleTask} style={{ display:'inline-block' , marginRight:'10px',float:"right" }}>Add Task</Button>
        </div>
    )
}

export default TaskHeader;

