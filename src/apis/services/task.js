import apiCaller from "./../apiCaller";
import {CREATE_TASK,LIST_TASK,UPDATE_TASK,DELETE_TASK}  from './../endpoints';

export const createTask = async(obj)=>{
    try {
        let response =  await apiCaller({method:'POST',url:CREATE_TASK,obj,formdata:true});
        return response;
    }catch(e){
        throw e;
    }
}

export const taskList = async()=>{  
    try{
        let response =  await apiCaller({url:LIST_TASK});
        return response;
    }catch(e){
        throw e;
    }
}

export const updateTask = async(obj,id)=>{  
    try{
        let response =  await apiCaller({method:'PUT',url:UPDATE_TASK(id),obj,formdata:true});
        return response;
    }catch(e){
        throw e;
    }
}

export const deleteTask = async(id)=>{  
    try{
        let response =  await apiCaller({method:'DELETE',url:DELETE_TASK(id)});
        return response;
    }catch(e){
        throw e;
    }
}



