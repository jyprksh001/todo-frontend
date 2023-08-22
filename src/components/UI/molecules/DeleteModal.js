import React from "react";
import {Button,Card,Modal} from "react-bootstrap";

const DeleteModal=({deleteModal,handleClose,action})=>{
  
  return (
    <>  
      <Modal show={deleteModal} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Card.Text>Do you relly want to delete this task ??</Card.Text>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="primary" onClick={()=>action({controlName:"deleteModal",type:'no'})}>No</Button>
          <Button variant="primary" onClick={()=>action({controlName:"deleteModal",type:'yes'})}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal