import * as types from "./types";


export const list_task=(data)=>({
    type: types.TASKS_LIST,
    payload:data
})

export const add_task=(data)=>({
    type: types.ADD_TASK,
    payload:data
})

export const update_task=(data)=>({
    type: types.UPDATE_TASK,
    payload:data
})

export const delete_task=(data)=>({
    type: types.DELETE_TASK,
    payload:data
})



