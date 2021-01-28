import {REQ_END, REQ_START, SET_TODOS} from "../types/todosTypes";

export const setTodos = (todos) =>{
    return{
        type: SET_TODOS,
        payload: todos
    }
}
export const startReq = (val) =>{
    return{
        type: REQ_START,
        payload:val
    }
}

export const endReq = () =>{
    return{
        type : REQ_END
    }
}


export const setTime = (t) =>{
    return{
        type:"SET_TIME",
        payload:t
    }
}