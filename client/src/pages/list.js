import React, {useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook"
import {connect} from "react-redux"
import {AuthContext} from "../context/AuthContext";
import {setAllTodos, setCategories} from "../redux/actions/listActions";
import CatList from "../components/cat-list";
import {Loader} from "../components/loader";
import{setTime} from "../redux/actions/todosActions";
import {useHistory} from "react-router-dom"

const List = ({listReq, setCategories, setAllTodos, cat,setTime}) => {
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()

    const getTodosInfo = async () => {
        setCategories([])
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/all", "GET", null, {Authorization: `Bearer ${auth.token}`})
        console.log(res)
        return res
    }

    const getAllCat = (todos) => {
        const list = new Set()
        const arr = []
        for (let i = 0; i < todos.length; i++) {
            list.add(todos[i].categories)
        }
        for (let key of list) {
            arr.push(key)
        }
        setCategories(arr)
    }

    useEffect(() => {
        getTodosInfo().then(body => {
                setAllTodos(body.todos)
                return body
            }).then(async body => {
            await  getAllCat(body.todos)
            return body
        }).then(body=>{
            console.log(body.info.time)
            setTime(body.info.time)
        })
    }, [listReq])

    if (cat.length !== 0 && !loading) {
        return (
            <div className="row box">
                {
                    cat.map((el, idx) => {
                        return (
                            <CatList name={el} key={idx}/>
                        )
                    })
                }
            </div>
        )
    }
    if(cat.length === 0 && !loading){
        return (
            <div className="center_warning white-text"
            onClick={()=>history.push("/main")}>
                Add some todo !
            </div>
        )
    }
    if(loading){
        return (
            <Loader/>
        )
    }
}
const mapStateToProps = state => {
    return {
        todos: state.list.allTodos,
        cat: state.list.categories,
        listReq: state.list.listReq
    }
}

const mapDispatchToProps = {
    setAllTodos, setCategories,setTime
}

export default connect(mapStateToProps, mapDispatchToProps)(List)