import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {endListReq} from "../redux/actions/listActions";
import {connect} from "react-redux"
import {ButtonGroup} from "./buttons-group";

const ItemList = ({el, endListReq,time,useWar,listReq}) => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [alarm,setAlarm] = useState(false)
    const [hidden, setHidden] = useState(true)
    const {title, period, done, important, _id,} = el
    const strDate = new Date(period).toLocaleString("uk-UA", {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    })
    let className ="list-item"
    let classNameDone = ""
    if(done){
        classNameDone += " done"
    }
    if(!done){
        classNameDone = classNameDone.replace(/done/,'')
    }
    if(alarm ){
        className += " anim_todo"
    }
    if(!alarm){
        className = className.replace(/anim_todo/,'')
    }
    if(important && !done){
        className += " bold"
    }
    if(!important){
        className = className.replace(/bold/,'')
    }
    const dateCheck = useCallback(()=>{
        const date = new Date(period).getTime()
        const now = new Date().getTime()
        const size = date - now
        if(time && size <=(time*3600000) && !done && useWar) {
            setAlarm(true)
        }else if(!time && size<=7200000 && !done && useWar){
            setAlarm(true)
        }
    },[time])
    useEffect(()=>{
        dateCheck()
    },[dateCheck])
    const makeImportant = async () => {
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/important", "POST", {
            id: _id,
            important: important
        }, {Authorization: `Bearer ${auth.token}`})
        endListReq(!listReq)
    }

    const makeDone = async () => {

        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/done", "POST", {
            id: _id,
            done: done
        }, {Authorization: `Bearer ${auth.token}`})
        endListReq(!listReq)
    }

    const deleteTodo = async () => {
        const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/change/delete", "POST", {id: _id}, {Authorization: `Bearer ${auth.token}`})
        endListReq(!listReq)
    }
    return (
        <div className={className}>
            <div className="group_header">
                <div className={classNameDone}>{title}</div>
                {hidden && <i onClick={()=>setHidden(false)} className="material-icons dots">more_vert</i>}
            </div>
            <div>{strDate}</div>
            {!hidden && <ButtonGroup setHidden={setHidden} deleteTodo={deleteTodo} makeDone={makeDone}
                                     makeImportant={makeImportant}/>}
        </div>
    )
}
const mapDispatchToProps = {
    endListReq
}
const mapStateToProps = state =>{
    return{
        time:state.todos.time,
        useWar:state.profile.useWar,
        listReq: state.list.listReq
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)