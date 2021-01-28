import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import "materialize-css"
import {useRout} from "./routes";
import {AuthContext} from "./context/AuthContext";
import {MainNavbar} from "./components/main-navbar";
import {SignNavbar} from "./components/sign-navbar";
import {Loader} from "./components/loader";
import {Provider} from "react-redux"
import {store} from "./store";
export const App = () => {
    const {ready,token,login,logout,userId} = useAuth()
    const isAuthenticated = !!token
    const router = useRout(isAuthenticated)

    if(!ready){
        return (
            <Loader/>
        )
    }

    return (
        <Provider store={store}>
        <AuthContext.Provider value={{token,login,logout,userId,isAuthenticated}}>
        <Router>
            {isAuthenticated && <MainNavbar/>}
            {!isAuthenticated && <SignNavbar/>}
            <>
                {router}
            </>
        </Router>
        </AuthContext.Provider>
        </Provider>
       )
}