import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import PopOver from "./popover";

export const Register = () => {
    const [form, setForm] = useState(
        {name: "", password: "", email: ""})
    const {loading, error, clearError, request} = useHttp()
    const message = useMessage()
    const history = useHistory()
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const resetHandler = () => {
        setForm({name: "", password: "", email: ""})
    }
    const registerHandler = async () => {
        try {
            const res = await request("https://tranquil-spire-85621.herokuapp.com/api/auth/register", "POST", {...form})
            message(res.message)
            if(res.next) {
                history.push("/login")
            }
            for(let i=0;i<res.errors.length;i++){
                message(res.errors[i].msg)
            }
        } catch (e) {
        }
    }
    useEffect(() => {
        window.M.updateTextFields();
    }, [])
    useEffect(() => {
        message(error)
        clearError()
    }, [message, error, clearError])
    return (
        <div className="row login">
            <div className="col offset-m3 offset-l3 s12 m6 l6 ">
                <h1 className="white-text login_message">Your helper with task!</h1>
                <div className="card  blue-grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Register</span>
                        <div className="input-field ">
                            <input placeholder="Input your email"
                                   id="email"
                                   type="text"
                                   name="email"
                                   onChange={changeHandler}
                                   value={form.email}
                                   className="validate white-text"/>
                            <label htmlFor="email">Email</label>
                        </div>
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
                    <div className="card-action my_card register_block">
                        <button type="submit"
                                onClick={registerHandler}
                                className="btn white waves-effect waves-yellow black-text">Accept
                        </button>
                        <button type="reset"
                                onClick={resetHandler}
                                className=" btn waves-effect waves-yellow white black-text">Refresh
                        </button>
                        <div className="popopo">
                        <PopOver/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}