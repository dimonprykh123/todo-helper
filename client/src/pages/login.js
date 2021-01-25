import React, {useContext, useEffect, useState} from "react"
import "../index.css"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
export const Login = () => {
    const {loading,error,clearError,request} = useHttp()
    const auth = useContext(AuthContext)
    const message= useMessage()
    const [form, setForm] = useState(
        {name: "", password: ""})
    const changeHandler =event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    const resetHandler =() =>{
        setForm({name:"",password: ""})
    }
    const loginHandler = async () =>{
        try {
            const res = await request("https://tranquil-spire-85621.herokuapp.com/api/auth/login", "POST", {...form})
            auth.login(res.token, res.userId)
            message.res(message)
        }catch (e) {

        }
    }
    useEffect(()=>{
        window.M.updateTextFields();
    },[])
    useEffect(()=>{
        message(error)
        clearError()
    },[error,clearError,message])
    return (
        <div className="row login">
            <div className="col offset-m3 offset-l3 s12 m6 l6">
                <h1 className="white-text login_message">Your helper with task!</h1>
                <div className="card  blue-grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div className="input-field ">
                            <input placeholder="Input your name"
                                   id="name"
                                   type="text"
                                   name="name"
                                   onChange={changeHandler}
                                   value={form.name}
                                   className="validate white-text"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field ">
                            <input placeholder="Input your password"
                                   id="password"
                                   type="password"
                                   name="password"
                                   onChange={changeHandler}
                                   value={form.password}
                                   className="validate white-text"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action my_card">
                        <button type="submit" className="btn-small white black-text waves-yellow waves-effect"
                        onClick={loginHandler}
                        disabled={loading}>Accept</button>
                        <button type="reset"
                        onClick={resetHandler}
                                className=" btn-small white black-text waves-yellow waves-effect">Refresh</button>
                    </div>
                </div>
            </div>
        </div>

    )
}