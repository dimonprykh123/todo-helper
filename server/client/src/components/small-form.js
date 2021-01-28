import React, {useContext, useState} from "react"
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import {Input} from "./castom-input";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {endListReq} from "../redux/actions/listActions";
import {useMessage} from "../hooks/message.hook";
import {connect} from "react-redux"
const SamllFrom = ({cat,fn,endListReq,listReq}) => {
    const {request} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [time, setTime] = useState("11:11")
    const [form, setForm] = useState({title: "", term: new Date()})
    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const addTodos = async () => {
        const {term,title} = form
        let year = term.getFullYear()
        let month = term.getUTCMonth()
        let day = term.getDate()
        const hours = time.slice(0,2)
        const minutes = time.slice(3,5)
        const sendedDate = new Date(year,month,day,Number(hours),Number(minutes))
        if(title.trim().length!==0) {
            const res = await request("/api/main/add", "POST", {
                sendedDate,
                title,
                categories:cat
            }, {Authorization: `Bearer ${auth.token}`})
            endListReq(!listReq)
            setForm({title: "", term: new Date()})
        }else{
            message("All lines must be completed!")
        }
    }
    return (
        <div>
            <i onClick={()=>fn()} className=" up material-icons">expand_less</i>
            <DatePicker id="date" selected={form.term} onChange={date => setForm({...form, term: date})}/>
            <TimePicker id="time" value={time} onChange={setTime}/>
            <Input changeHandler={changeHandler}
                   obj={{id: "title", val: form.title, ph: "Input your task", text: "task"}}/>
            <button onClick={addTodos} className="btn white black-text">Add</button>
        </div>
    )
}
const mapDispatchToProps = {
    endListReq
}

const mapStateToProps = state =>{
    return{
        listReq:state.list.listReq
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SamllFrom)