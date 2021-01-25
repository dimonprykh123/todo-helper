import React from "react"

export const ButtonGroup = ({makeDone,makeImportant,deleteTodo,setHidden}) =>{

    return(
        <div className="btn-block for_list">
            <div>
            <button onClick={makeDone} className="btn-small white black-text waves-effect"><i
                className="material-icons">check</i></button>
            <button onClick={makeImportant} className="btn-small white black-text waves-effect waves-red"><i
                className="material-icons">priority_high</i></button>
            <button onClick={deleteTodo} className="btn-small white black-text"><i
                className="material-icons">delete</i></button></div><i onClick={()=>setHidden(true)} className="material-icons mark">close</i>
        </div>
    )
}