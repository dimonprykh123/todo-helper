import React, {useContext} from "react"
import {NavLink, useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";
import {useMedia} from "react-use"
import {Dropdown, DropdownButton} from "react-bootstrap";
export const MainNavbar = () => {
    const isWide = useMedia('(min-width: 1140px)');
    const history = useHistory()
    const auth = useContext(AuthContext)
    const exitHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/login")
    }
    return (<>

        <nav>
            <div className="nav-wrapper teal black">
                <span className="brand-logo center">Board-helper</span>
                {isWide &&
                <ul className="left hide-on-med-and-down">
                    <li className="hoverable"><a href="/login" onClick={exitHandler} id="exit"><i
                        className="material-icons right">directions_run</i>exit</a></li>
                    <li className="hoverable"><NavLink to="/list"><i
                        className="material-icons right">list</i>list</NavLink></li>
                    <li className="hoverable"><NavLink to="/main"><i className="material-icons right">mode_edit</i>main</NavLink></li>
                    <li className="hoverable"><NavLink to="/profile"><i className="material-icons right">person</i>profile</NavLink></li>
                    <li className="hoverable"><NavLink to="/info"><i className="material-icons right">info_outline</i>info</NavLink></li>
                </ul>
                }

                {
                    !isWide &&  <DropdownButton id="dropdown-item-button" title={<i className="small material-icons">dehaze</i>}>
                        <Dropdown.Item as="button" onClick={exitHandler}><NavLink to="/login">exit</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to="/list">list</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to="/main">main</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to="/profile">profile</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to="/info">info</NavLink></Dropdown.Item>
                    </DropdownButton>
                }

            </div>
        </nav>

    </>)
}