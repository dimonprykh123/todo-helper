import React from "react"
import {connect} from "react-redux"
import {confirmEdit,setWar} from "../redux/actions/profileActions";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
const PersoneBox= ({person,confirmEdit,some,setCheck,useWar}) =>{

    return(
        <div className="row">
            <div className="col s12 ">
                <div className="card blue-grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Personal info</span>
                        <i className="material-icons large ">person</i>
                        <p>Name: {person.first_name} {person.second_name}</p>
                        <p>Telegram: {person.telegramm}</p>
                        <p>Timer: {person.time}</p>
                    </div>
                    <div className="card-action btn-control">
                        <div className="white-text closest">
                            {some && <div>Not full information!</div>}
                            <div>
                            <button
                                onClick={confirmEdit}
                                className="btn white black-text waves-yellow waves-effect">Edit</button>
                            </div>
                            <div>
                            <BootstrapSwitchButton
                                checked={useWar}
                                onlabel={<i className="material-icons black-text">alarm_on</i>}
                                offlabel={<i className="material-icons black-text">alarm_off</i>}
                                onChange={checked=>setCheck(checked)}/>
                            </div>
                        </div>.
                    </div>
                </div>
            </div>
        </div>
        )
}

const mapDispatchToProps ={
    confirmEdit
}

const mapStateToProps = state =>{
    return{
         useWar:state.profile.useWar
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersoneBox)
