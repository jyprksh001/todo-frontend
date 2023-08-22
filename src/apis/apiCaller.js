import axios from 'axios';
import store from './../redux/store';
import {BASE_URL} from "./endpoints";
const REQUEST_TIMEOUT = 12000;

const axiosInstance = axios.create({
    timeout: REQUEST_TIMEOUT,
    baseURL: BASE_URL
});
const apiRequest = async({
    method = 'GET',
    url,
    obj,
    headers={ 
        'Content-Type': 'application/json'
    },
    formdata=false
})=> {
    console.log(method,url,obj,headers)

    try {
        

        
        const response = await axiosInstance.request( {
            method,
            url,
            data:!!formdata?obj:JSON.stringify(obj),
            headers
        })
        
        const { 
            status,
            data
        } = response || {}

        if (status >= 200 && status < 400) {
            return data
        } else {
            throw response
        }

    } catch (error) {
        throw error
    }
}

axiosInstance.interceptors.request.use( (config) =>{
    const {token,isLoggedin}= store.getState();
    if(isLoggedin) config.headers["x-auth-token"] = token
    return config;
});

export default apiRequest;