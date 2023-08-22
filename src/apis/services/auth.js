import apiCaller from "./../apiCaller";
import {SIGNUP,SIGNIN}  from './../endpoints';

export const signup = async(obj)=>{
    try {
        let response =  await apiCaller({method:'POST',url:SIGNUP,obj});
        return response;
    }catch(e){
        throw e;
    }
}

export const signin= async(obj)=>{  
    try{
        let response =  await apiCaller({method:'POST',url:SIGNIN,obj});
        return response
    }catch(e){
        throw e;
    }
}
