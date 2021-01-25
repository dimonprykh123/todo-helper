import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import ItemList from "./list-item";
import SamllFrom from "./small-form";

const CatList = ({name, allTodos,time,useWar}) => {
    const [state, setState] = useState([])
    const [statistic, setStatistic] = useState({done: 0, warning: 0, task:0})
    const [active, setActive] = useState(false)
    const className = ["card-title red-text", "card-title blue-text", "card-title orange-text ", "card-title green-text", "card-title purple-text"]
    const rand = Math.floor(Math.random() * className.length)
    const createList = () => {
        const arr = []
        for (let i = 0; i < allTodos.length; i++) {
            if (allTodos[i].categories === name) {
                arr.push(allTodos[i])
            }
        }
        setState(arr)
        let done = 0
        let war = 0
        for (let i = 0; i < arr.length; i++) {
            const date = new Date(arr[i].period).getTime()
            const now = new Date().getTime()
            const size = date - now
            if (arr[i].done)
                done++
            if (time && size <= (time*3600000) && !arr[i].done && useWar) {
                war++
            }else if(!time && size <= 7200000 && !arr[i].done && useWar){
                war++
            }
        }
        let per = (done/arr.length) * 100
        if(!Number.isInteger(per)){
            per = per.toFixed(2)
        }
        setStatistic({task:arr.length,done:per,warning:war})
    }
    useEffect(() => {
        window.M.updateTextFields()
    })
    useEffect(() => {
        createList()
    }, [])
    return (
        <div className="col s12 m6 l3 ">
            <div className="row s12  ">
                <div className="col s12 ">
                    <div className="card hoverable  ">
                        <div className="card-content block ">
                            <span className={className[rand]}>{name}</span>
                            <span className={className[rand]}>task:{statistic.task} done:{statistic.done}%
                                {(useWar && <span> warnings:{statistic.warning}</span>) || (!useWar && <span> warnings:off</span>)}</span>
                            <ul className="collection some">
                                {
                                    state.map((el, idx) => {
                                        return (
                                            <li key={idx} className="collection-item hov">
                                                <ItemList idx={idx} el={el}/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="card-action add_main ">
                            {!active && <div className="add" onClick={() => setActive(true)}>add task to list<i
                                className=" drop material-icons">expand_more</i></div>}
                            {active && <SamllFrom cat={name} fn={setActive}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        allTodos: state.list.allTodos,
        time :state.todos.time,
        useWar:state.profile.useWar
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(CatList)

