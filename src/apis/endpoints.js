export const BASE_URL = "http://localhost:3000";
export const SIGNIN  = "/auth/signin";
export const SIGNUP  = "/auth/signup";
export const CREATE_TASK = "/task/create-task";
export const LIST_TASK = "/task/list-tasks";
export const UPDATE_TASK = (id)=> (`/task/${id}/update-task`);
export const DELETE_TASK = (id)=> (`/task/${id}/delete-task`);
