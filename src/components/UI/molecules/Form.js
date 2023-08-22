import React ,{ useEffect, useState } from "react";
import {FormInput,FormButton} from "./../atoms/index";
import Joi from 'joi';
import FormValidation from "../atoms/ValidationError";
import Message from "../atoms/Message";  
import { connect } from "react-redux";
import {signin_success} from "../../../redux/actions/auth";

const Form = ({apiCall,type,switchForm,signin_success}) => {
  const [state, setState] = useState({ phone:"",password:""});
  const [reset,setReset] = useState(false);
  // const [isDisabled, setDisabled]= useState(false);
  const [validationError,setValidationError]= useState({phone:false,password:false});
  const [message,setMessage]=useState("");

  const isFormValid = async({key,value,all=false})=>{
    let validators={
      phone : Joi.string().min(10).max(10).required(),
      password : Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required()
    }
    let rules = all ? validators:{[key]:validators[key]};
    let data = all ? {...state}:{[key]:value}
    let schema = Joi.object(rules);
    return schema.validate(data,{ abortEarly: false });  
  }
  
  const handleChange = async e => {
      const { name, value } = e.target;
      const validation = await isFormValid({key:name,value});
      if(validation.error) await setValidationError(prev => ({...prev,[validation.error.details[0]['path'][0]]: validation.error.details[0]['message']}));
      else await setValidationError(prev => ({...prev,[name]:false}))
      await setState((prevState) =>({...prevState,...{[name]: value}})); 
  }
  
  const callApi = async()=>{
    const validation = await isFormValid({all:true});
    if(validation.error){
      validation.error.details.map(async({path,message})=>{
        await setValidationError(prev => ({...prev,[path[0]]:message})
      )})
      return
    }else {
      await setValidationError({phone:false,password:false})
      try{
        const response = await apiCall(state);
        setMessage( type === "signup" ? "Signup successful. Signin to continue" : "Yay, Let's GO!!!")
        if(type === "signin"){
          const { token,phone } = response ; 
          localStorage.setItem('token',token)
          localStorage.setItem('phone',phone)
          signin_success({token,phone,isLoggedin:true});
        }
      }catch(e){
        setMessage(e.message);
      }
    }
  }

  useEffect(()=>{
    setTimeout(()=>setMessage(""),5000)
  },[message])

  const toggle = async(e)=>{
    setReset(!reset);
    setState({ phone:"",password:""})
    setValidationError({phone:false,password:false})
    switchForm(type === "signup"?"signin":"signup");
  }

  const {phone, password} = validationError;
  
  return(
    <div>
        {/* Cant send opt , otp apis not available */}
        <Message message={message}/> 
        <FormInput description="Phone" reset={reset} placeholder="Enter your phone number" type="text" handleChange={handleChange} name={"phone"}/>
        <FormValidation error={phone} ></FormValidation>
        <FormInput description="Password" reset={reset}  placeholder="Enter your password" type="password" handleChange={handleChange}  name={"password"}/>
        <FormValidation error={password} ></FormValidation>
        <FormButton style={{marginTop:"30px"}} title={ type === "signup" ? "SIGN UP" : "SIGN IN" } onClick={callApi}/>
        <FormButton title={ type === "signup" ? "SIGN IN":"SIGN UP" } onClick={ (e)=> toggle(e)} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    signin_success:(data) => dispatch(signin_success(data)),
  }
}

export default connect(null,mapDispatchToProps)(Form);



