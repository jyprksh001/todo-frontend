import React,{ useState } from "react";
import Form from "./../molecules/Form";
import FormHeader from "./../atoms/FormHeader";
import {signin,signup} from './../../../apis/services/auth';

const  LoginForm = () => {
    const [type,setType] = useState("signup");

    const apiCall= async(data)=>{
       return(type === 'signup' ? await signup(data) : await signin(data));
    }

    const switchForm = async(type) =>{
      await setType(type === "signup" ? "signup":"signin")
    }
    
    return(
      <div id="loginform">
        <FormHeader title={type === "signup" ?"SIGN UP":"SIGN IN"} />
        <Form type={type === "signup" ? "signup":"signin"} apiCall={apiCall} switchForm={switchForm} />
      </div>
    )
}

export default LoginForm;