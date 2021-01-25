import React, {useCallback, useContext, useEffect, useState} from "react"
import AddTodo from "../components/add-todo";
import AllTodos from "../components/all-todos";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Main = () => {
    return (
        <div className="row s12 l12 m12">
            <AddTodo/>
            <AllTodos/>
        </div>
    )
}

