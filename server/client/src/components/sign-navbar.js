import React from "react"
import {NavLink} from "react-router-dom";
import {useMedia} from "react-use"
import {Dropdown, DropdownButton} from "react-bootstrap";
export const SignNavbar = () =>{
    const isWide = useMedia('(min-width: 993px)');
    return(<>

                <nav>
                    <div className="nav-wrapper black">
                        <span className="brand-logo center white-text">Signing</span>
                        { isWide &&
                        <ul className="left hide-on-med-and-down">
                            <li><NavLink to="/register">Register</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                        }
                        {
                            !isWide &&  <DropdownButton id="dropdown-item-button" title={<i className="small material-icons">dehaze</i>}>
                                <Dropdown.Item as="button"><NavLink to="/register">register</NavLink></Dropdown.Item>
                                <Dropdown.Item as="button"><NavLink to="/login">login</NavLink></Dropdown.Item>
                            </DropdownButton>
                        }
                    </div>
                </nav>


        </>

    )
}