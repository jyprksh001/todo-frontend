import React from "react";
import {Container,Card,Button} from "react-bootstrap";
import { connect } from "react-redux";

const TaskList = ({controlHandler,tasks})=>{
    
    let style = {  
        position: 'relative',
        clear:'both',
        top: '60px'
    } 
    
    return ( 
        <Container style={style}>
            {
                tasks.length > 0?
                tasks.map((task)=>(
                    <Card border="primary" style={{top:'15px'}} key={task._id}>
                        <Card.Body >
                            <Card.Text style={{display:'inline-block',marginRight:'10px'}}>Task:{task.title}</Card.Text>

                            {
                                (task.category) && (<Card.Text style={{display:'inline-block',marginRight:'10px'}}>Category:{task.category}</Card.Text>)
                            }

                            {
                                (task.image) &&(<Card.Text style={{display:'inline-block'}}>Image:{task.image}</Card.Text>)
                            }

                            <div style={{display:'inline-block',float:'right',position: 'relative'}} >
                                <Button onClick={() => controlHandler('edit',task._id)}>Edit</Button>
                                <Button onClick={() => controlHandler('delete',task._id)} style={{marginLeft:'10px'}}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
                :
                (
                    <Card border="primary" style={{top:'10px'}} >
                        <Card.Body >
                            <Card.Text style={{display:'inline-block'}}> Go do some work ra Tambi !!</Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
        </Container>
    )
}
const mapStateToProps=({tasks})=>({tasks});

export default connect(mapStateToProps)(TaskList);

