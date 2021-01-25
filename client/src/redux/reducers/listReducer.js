const initialState = {
    categories: [],
    allTodos: [],
    skip: 0,
    page:1,
    listReq:false,
    canCreate:true
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_TODOS":
            return {...state, allTodos: action.payload}
        case "SET_CATEGORIES":
            return {...state, categories: action.payload}
        case "SET_SKIP":
            return {...state, skip: action.payload}
        case "SET_PAGE":
            return {...state,page:action.payload}
        case "END_LIST_REQ":
            return {...state,listReq:action.payload}
        default:
            return state
    }
}
