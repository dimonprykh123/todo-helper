import React from "react";
import {Popover, OverlayTrigger} from "react-bootstrap";

const popover = (
    <Popover id="popover-basic">
        <Popover.Content>
            <code>Email : You can right some "test@mail.com" or another imaginary email ,</code><br/>
            <code>its just formality , maybe later email notification will be work !</code><br/>
            <code>Password : not less then 6 symbols !</code>
        </Popover.Content>
    </Popover>
);

const PopOver = () => {
    return (<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <i className="material-icons white-text">info</i>
    </OverlayTrigger>)
}

export default PopOver