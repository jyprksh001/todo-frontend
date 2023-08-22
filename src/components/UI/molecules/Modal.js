import React,{ useState,useEffect } from "react";
import {Button,Modal,FloatingLabel,Form} from "react-bootstrap";
import Joi from 'joi';
import FormValidation from "../atoms/ValidationError";

const AddOrEditTaskModal=({type,modal,action,handleClose,id,tasks})=>{
  console.log(type)
  const [state, setState] = useState(null);
  const [validationError,setValidationError]= useState({title:false,category:false,file:false});

  useEffect(()=>{
    setState(prevState=> {
      if(type === "edit" && !!id ){
        let task=tasks.filter(task=>task._id===id)[0];  
        const {title,category}=task;
        return {...prevState,...{title,category}}
      }
    }) 
  },[id])

  const handleChange = async(e)=>{
    const { name, value ,files} = e.target;
    let  validation = await isFormValid({key:name,value:(name==="file"?files[0]:value)});
    if(validation.error) await setValidationError(prev => ({...prev,[validation.error.details[0]['path'][0]]: validation.error.details[0]['message']}));
    else await setValidationError(prev => ({...prev,[name]:false}))
    await setState({...state,[name]: files && files.length>0 ? files[0]:value}) ;
  }

  const isFormValid = async({key,value,all=false})=>{
    let validators={
      title : Joi.string().required(),
      category : Joi.string().required(),
      file: Joi.any().custom((value,helper)=>{
        let file_type= ["image/png", "image/jpeg", "image/jpg"];
        if(file_type.includes(value.type)) return 
        return helper.message('Only image with extensions image/png, image/jpeg, image/jpg are allowed')
      })
    }

    let rules = all ? validators:{[key]:validators[key]};
    let data = all ? {...state}:{[key]:value}
    let schema = Joi.object(rules);
    return schema.validate(data,{ abortEarly: false });  
  }

  const {title:titleError, category:categoryError,file:fileError} = validationError;

  return (
    
    <>

      <Modal show={modal} onHide={handleClose}>
        {JSON.stringify(state)}
        <Modal.Header closeButton>
          <Modal.Title>{ type === 'create' ? 'Create Task' : 'Update Task' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3" >
                <FloatingLabel controlId="floatingTextarea2" label="Enter Title Here">
                    <Form.Control
                        
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }} onChange={handleChange} name={'title'}  value={(state && state.title)?state.title:""}/>    
                </FloatingLabel>
                <FormValidation error={titleError} /> 
                <Form.Control type="text" 
                style={{ position: 'relative',top: '10px', bottom:'3px'}} 
                 placeholder="Add a tag" onChange={handleChange} name={'category'} value={(state && state.category)?state.category:""} />
                <FormValidation error={categoryError} />
                <Form.Control type="file" 
                  style={{ position: 'relative',top: '10px'}}  onChange={handleChange} 
                  name={'file'} />
                <FormValidation error={fileError} ></FormValidation>
            </Form.Group>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" onClick={async()=>{
              const validation = await isFormValid({all:true});
              if(validation.error){
                validation.error.details.map(async({path,message})=>{
                  await setValidationError(prev => ({...prev,[path[0]]:message})
                )})
                return
              }else{
                action({controlName:'modal',type,obj:{...state}})
                await setState(null)
              }
        }}>{ type === 'create' ? 'Create Task' : 'Update Task' }</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddOrEditTaskModal;