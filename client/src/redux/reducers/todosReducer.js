const initialState = {
    todosList : [],
    important :null,
    done: null,
    warning:null,
    req:false,
    time:null
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return {...state,todosList: action.payload}
        case "REQ_START":
            return {...state,req:action.payload}
        case "SET_TIME":
            return {...state,time:action.payload}
        default:
            return state
    }
}