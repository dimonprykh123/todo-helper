import {SET_ALL_TODOS, SET_CATEGORIES, SET_SKIP, SET_PAGE} from "../types/listTypes";

export const setAllTodos = (todos) => {
    return {
        type: SET_ALL_TODOS,
        payload: todos
    }
}

export const setCategories = (cat) => {
    return {
        type: SET_CATEGORIES,
        payload: cat
    }
}

export const setSkip = (skip) => {
    return {
        type: SET_SKIP,
        payload: skip
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
}

export const startListReq = () => {
    return {
        type: "START_LIST_REQ"
    }
}
export const endListReq = (val) => {
    return {
        type: "END_LIST_REQ",
        payload:val
    }
}
