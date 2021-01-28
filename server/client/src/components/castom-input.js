import React from "react"

export const Input =({obj={},changeHandler,className="input-field",addClassName="validate"}) =>{
    const {id,val,ph,text} = obj
    return(
        <div className={className}>
            <input placeholder={ph}
                   id={id}
                   type="text"
                   name={id}
                   onChange={changeHandler}
                   value={val}
                   className={addClassName}/>
            <label htmlFor={id}>{text}</label>
        </div>
    )
}