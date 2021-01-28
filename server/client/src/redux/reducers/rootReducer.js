import {combineReducers} from "redux"
import {profileReducer} from "./profileReducer";
import {todosReducer} from "./todosReducer";
import {listReducer} from "./listReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    todos: todosReducer,
    list: listReducer
})