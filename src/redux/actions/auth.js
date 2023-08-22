import * as types from "./types";

export const signin_success=(data)=>({
    type: types.SIGNIN_SUCCESS,
    payload:data
})

export const logout=(data)=>({
    type: types.LOGOUT,
    payload:data
})