import React from "react"

export const DonePercent = ({obj}) =>{
    return(
        <div className="row s12 m12 l12">
            <div className="col s12 m12 l12 ">
                <div className="card blue-grey darken-4">
                    <div className={obj.text}>
                        <span className="card-title">{obj.title} {obj.style.width}</span>
                    </div>
                    <div className="card-action">
                        <div className="progress">
                            <div className={obj.line} style={obj.style}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}