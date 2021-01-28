import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {connect} from "react-redux"
import {setTodos} from "../redux/actions/todosActions";
import Todos from "./todos";
import {Loader} from "./loader";
import Pag from "./pagination";
import {setTime} from "../redux/actions/todosActions";
import {setWar} from "../redux/actions/profileActions";

const AllTodos = ({todos, setTodos, skip, req, page, setTime, setWar}) => {

    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const [todoCount, setTodosCount] = useState(0)
    const getTodosCount = async () => {
        const res = await request("/api/main/byPagination", "GET", null, {Authorization: `Bearer ${auth.token}`})
        return res
    }
    const getPaginationTodos = async (skip, limit) => {
        const res = await request("/api/main/byLimitSkip", "POST", {
            skip: skip,
            limit: limit
        }, {Authorization: `Bearer ${auth.token}`})
        return res
    }
    useEffect(() => {
        getTodosCount().then((body) => {
            setTodosCount(body.todos)
            return body
        })
            .then(body => {
                setTime(body.info.time)
                return body
            }).then(body=>{
                setWar(body.info.warning)
        })
        getPaginationTodos(skip, 5).then((body) => setTodos(body.todos))
    }, [req, skip])

    if (loading) {
        return (
            <div className="spin">
                <Loader/>
            </div>
        )
    }
    if (!loading && todos.length !== 0) {
        return (
            <div className=" col s12 l12 m12">
                <table className=" responsive-table centered highlight white-text opacity ">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Task</th>
                        <th>Categories</th>
                        <th>Term to done</th>
                        <th>Marks</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>{
                        todos.map((el, idx) => {
                            return (
                                <Todos skip={skip} el={el} idx={idx} key={el._id}/>
                            )
                        })
                    }</tbody>
                </table>
                <div className="pag">
                    <Pag todosCount={todoCount} activePage={page}/>
                </div>

            </div>
        )
    } else {
        return (
            <div className="white-text">
                You dont have tasks !
            </div>
        )
    }

}
const mapDispatchToProps = {
    setTodos, setTime, setWar
}

const mapStateToProps = state => {
    return {
        todos: state.todos.todosList,
        skip: state.list.skip,
        page: state.list.page,
        req: state.todos.req
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllTodos)