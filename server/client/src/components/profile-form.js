import React, { useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Input} from "./castom-input";
import {connect} from "react-redux"
import {endEdit} from "../redux/actions/profileActions";
import {setTime} from "../redux/actions/todosActions";

const ProfileForm = ({endEdit,set,setTime}) => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({first_name: "", second_name: "", telegramm:"",time:""})
    const postForm = async () => {
        if(!(/[0-9]/).test(form.time)){
           message("Time must be a number")
        }
        if(form.first_name!=="" && form.second_name!=="" && form.telegramm!=="" && form.time!=="" && (/[0-9]/).test(form.time)) {
            const data = await request("/api/client/profile", "POST", {...form}, {Authorization: `Bearer ${token}`})
            endEdit()
            setTime(form.time)
            set(false)
        }
        if(form.first_name === "" || form.second_name === "" || form.telegramm === "" || form.time === ""){
            message("All lines must be completed")
        }
    }

    const resetForm =() =>{
        setForm({first_name: "", second_name: "",telegramm: "",time:""})
    }

    const changeHandler = event => {
            setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect(()=>{
        window.M.updateTextFields()
        
    },[form])
    return (
        <div className="row">
            <div className="col s12">
                <div className="card  blue-grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title"><i className="material-icons ">person</i> Please add some information!</span>
                        <Input obj={{id:"first_name", val:form.first_name, ph:"Input your first name", text:"First name"}} changeHandler={changeHandler} addClassName={"validate white-text"}/>
                        <Input obj={{id:"second_name", val:form.second_name, ph:"Input your second name", text:"Second name"}} changeHandler={changeHandler} addClassName={"validate white-text"}/>
                        <Input obj={{id:"telegramm", val:form.telegramm, ph:"Input your telegramm", text:"Telegramm"}} changeHandler={changeHandler} addClassName={"validate white-text"}/>
                        <Input obj={{id:"time", val:form.time, ph:"Input warning timer in hours", text:"Hours"}} changeHandler={changeHandler} addClassName={"validate white-text"} />
                        </div>
                        <div className="card-action my_card">
                            <button type="submit"
                                    onClick={postForm}
                                    className="btn white black-text waves-yellow waves-effect">Accept
                            </button>
                            <button type="reset"
                                    onClick={resetForm}
                                    className="btn white black-text waves-yellow waves-effect">Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
}

const mapDispatchToProps = {
    endEdit,setTime
}
export default connect(null,mapDispatchToProps)(ProfileForm)