import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {connect} from "react-redux"
import {startReq, endReq} from "../redux/actions/todosActions";
const Todos = ({el, idx, startReq,time,useWar,req}) => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const {title, period, done, important, _id, categories} = el
    const [alarm,setAlarm] = useState(false)
    const dateCheck =()=>{
        const date = new Date(period).getTime()
        const now = new Date().getTime()
        const size = date - now
        if(time && size <=(time*3600000) && useWar) {
            setAlarm(true)
        }else if(!time && size<=7200000 && useWar){
            setAlarm(true)
        }
    }
    useEffect(()=>{
       dateCheck()
    },[])
    const makeImportant = async () => {
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/important", "POST", {
            id: _id,
            important: important
        }, {Authorization: `Bearer ${auth.token}`})
        startReq(!req)

    }

    const makeDone = async () => {
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/done", "POST", {
            id: _id,
            done: done
        }, {Authorization: `Bearer ${auth.token}`})
        startReq(!req)

    }

    const deleteTodo = async () => {
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/delete", "POST", {id: _id}, {Authorization: `Bearer ${auth.token}`})
        startReq(!req)
    }
    const strDate = new Date(period).toLocaleString("uk-UA",{day:'numeric', month:'long', year:'numeric', weekday:'long',hour:'2-digit', minute:'2-digit'})
    return (
        <tr className="hoverable">
            <td>{idx+1}</td>
            <td>{title}</td>
            <td>{categories}</td>
            <td>{strDate}</td>
            <td>{((((important && !done && !alarm) && <i className="material-icons btn-floating pulse yellow imp">priority_high</i>)
                ||
                (done && <i className="material-icons">check</i>)
                ||
                ((alarm && !done) && <i
                    className="material-icons btn-floating red pulse warning">access_alarm</i>))
                ||
                <div>No Marks</div>)}</td>
            <td>
                <div className="btn-block">
                    <button className="btn-small white black-text waves-effect waves-yellow"
                            onClick={makeImportant}
                    >important
                    </button>
                    <button className="btn-small white black-text waves-effect waves-green"
                            onClick={makeDone}
                    >Done
                    </button>
                    <button className="btn-small white"
                            onClick={deleteTodo}
                    ><i className="material-icons black-text waves-effect waves-red">delete</i></button>
                </div>
            </td>
        </tr>
    )
}
const mapDispatchToProps = {
    startReq, endReq
}
const mapStateToProps = state =>{
    return{
        time:state.todos.time,
        useWar:state.profile.useWar,
        req:state.todos.req
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todos)


