import React, {useCallback, useContext, useEffect, useState} from "react"
import {Input} from "./castom-input";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import "../index.css"
import {connect} from "react-redux"
import{startReq} from "../redux/actions/todosActions";



const AddTodo = ({startReq,req}) => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [time,setTime] = useState( "11:11")
    const [form, setForm] = useState({title: "", term: new Date(), categories: ""})
    const message = useMessage()
    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const addTodos = async () => {
        const {term,title,categories} = form
        let year = term.getFullYear()
        let month = term.getUTCMonth()
        let day = term.getDate()
        const hours = time.slice(0,2)
        const minutes = time.slice(3,5)
        const sendedDate = new Date(year,month,day,Number(hours),Number(minutes))
        if(title.trim().length!==0 && categories.trim().length!==0) {
            const res = await request("https://tranquil-spire-85621.herokuapp.com/api/main/add", "POST", {
                sendedDate,
                title,
                categories
            }, {Authorization: `Bearer ${auth.token}`})
            startReq(!req)
            setForm({title: "", term: new Date(), categories: ""})
        }else{
            message("All lines must be completed!")
        }
    }
    useEffect(() => {
        window.M.updateTextFields()
    },[time,setTime])
    return (
        <div className=" col s12 l12 m12">
            <div className="row s12 l12 m12">
                <Input obj={{id: "title", val: form.title, ph: "Input title of task", text: "Title"}}
                       changeHandler={changeHandler}
                       className={"input-field col s12 m4 l4 in "} addClassName="validate white-text"/>
                <Input obj={{id: "categories", val: form.categories, ph: "Input your categories", text: "Categories"}}
                       changeHandler={changeHandler}
                       className={"input-field col s12 m4 l4  in "}
                       addClassName="validate white-text"/>
                <label htmlFor="date">Select date</label><br/>
                <div className="col s12 m4 l4  main_picker">
                <DatePicker id="date" selected={form.term} onChange={date => setForm({...form, term: date})}/>
                <TimePicker id="time" value={time} onChange={setTime} clockIcon={false} disableClock={true} clearAriaLabel={true}  clearIcon={false}/>
                    <button className="btn white black-text"
                            onClick={addTodos}
                    >Add task
                    </button>
                </div>

            </div>
        </div>
    )
}
const mapDispatchToProps = {
    startReq
}

const mapStateToProps = state =>{
    return{
        req:state.todos.req
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddTodo)