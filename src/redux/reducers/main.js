import * as TYPES from '../actions/types';

const appState={
    isLoggedin:!!localStorage.getItem("token"),
    phone:JSON.parse(localStorage.getItem("phone")) || "",
    token:localStorage.getItem("token") || "",
    tasks:[]
}

const Main=(state=appState,action)=>{
    console.log(action)
    switch (action.type){
        case  TYPES.SIGNUP_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }

        case  TYPES.SIGNIN_FAIL:{
            return {
                ...state,
                isLoggedin:false
            };
        }

        case  TYPES.SIGNIN_SUCCESS:{
            return {
                ...state,
                ...action.payload
            };
        }
        
        case  TYPES.LOGOUT:{
            return {
                ...state,
                ...{
                    isLoggedin:false,
                    tasks:[],
                    token:"",
                    phone:""
                }
            };
        }

        case TYPES.TASKS_LIST:{
            return {
                ...state,
                tasks:action.payload
            };
        }

        case TYPES.ADD_TASK:{
            return { 
                ...state, 
                tasks: [action.payload, ...state.tasks]
            }
        }
        
        case TYPES.UPDATE_TASK:{
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            console.log(index,action.payload)
            const updated_array = [...state.tasks]; 
            updated_array[index] = action.payload;
            return { 
                ...state,
                tasks: updated_array
            } 
        }

        case TYPES.DELETE_TASK:{
            return { 
                ...state, 
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        }
        default :
            return state;
    }

}

export default Main;