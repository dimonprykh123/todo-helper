import React from "react"
import {Route, Switch, Redirect} from "react-router-dom"
import {Login} from "./pages/login";
import {Register} from "./pages/ragister";
import {Main} from "./pages/main";
import Profile from "./pages/profile";
import List from "./pages/list";
import Info from "./pages/info";

export const useRout = isAuth => {
    if(isAuth){
        return(
            <Switch>
                <Route path="/main" exact>
                    <Main/>
                </Route>
                <Route path="/list" exact>
                    <List/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/info">
                    <Info/>
                </Route>
                <Redirect to="/main"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/register" exact>
                <Register/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}