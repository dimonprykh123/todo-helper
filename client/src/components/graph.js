import React, {useCallback, useEffect, useState} from "react"
import { LineChart,Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer }  from "recharts"
import {connect} from "react-redux"


const SimpleAreaChart = ({statistic}) => {
    const [dates,setDates] = useState([])
    const calcFunc = useCallback((statistic) =>{
        const nowDate = new Date();
        const oneDay = 86400 * 1000;
        const todayInSec = nowDate.getTime()
        const dates = [];
        for (let i = 0; i < 7; i++) {
            let done = 0
            let notDone = 0
            let newDate = new Date(todayInSec - oneDay * i)
            let weekYear = newDate.getFullYear()
            let weekMonth = newDate.getUTCMonth()
            let weekDay = newDate.getDate()
            for(let j = 0 ;j < statistic.length;j++)
            {
                let data = new Date (statistic[j].period)
                let dataYear = data.getFullYear()
                let dataMonth = data.getUTCMonth()
                let dataDay = data.getDate()
                if(dataYear===weekYear && dataMonth===weekMonth && dataDay===weekDay && statistic[j].done){
                    done++
                }
                if(dataYear===weekYear && dataMonth===weekMonth && dataDay===weekDay && !statistic[j].done){
                    notDone++
                }
            }
        let strDay = weekDay.toString().padStart(2,"0")
        let strMonth = (weekMonth +1).toString().padStart(2,"0")
        let str = `${strDay}.${strMonth}`
        dates.push({name:str,done,not_done:notDone,amt:5})
        }
        const newDates = dates.reverse()
        setDates(newDates)
    },[statistic])

    useEffect(()=>{
         calcFunc(statistic)
    },[calcFunc])
    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dates}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Line type='monotone' dataKey='done' stroke='blue'/>
            <Line type='monotone' dataKey='not_done' stroke='red'/>
        </LineChart>
        </ResponsiveContainer>
    )
}

const mapStateToProps = state =>{
    return{
        statistic: state.profile.statistic
    }
}
export default connect(mapStateToProps,null)(SimpleAreaChart)