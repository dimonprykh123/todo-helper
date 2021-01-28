import React, {useCallback, useContext, useEffect, useState} from "react"
import {DonePercent} from "../components/done-percent";
import PersoneBox from "../components/person-box";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/loader";
import ProfileForm from "../components/profile-form";
import SimpleAreaChart from "../components/graph";
import {setPerson, endEdit, confirmEdit, setStatistic,setWar,makeBtnReq} from "../redux/actions/profileActions";
import {connect} from "react-redux"

const Profile = ({setPerson, setStatistic, person, edit, makeBtnReq , setWar,make_req }) => {
    const {request, loading} = useHttp()
    const [nullPerson,setNullPerson] = useState(false)
    const auth = useContext(AuthContext)
    const [thisWeek, setWeek] = useState({
        style: {
            width: "0"
        },
        title: "Done at last 7 days ",
        text: "card-content green-text",
        line: "determinate green"
    })
    const [allTime, setAllTime] = useState({
        style: {
            width: "0"
        },
        title: "Done at all time",
        text: "card-content blue-text",
        line: "determinate blue"
    })
    const [notDone, setNotDone] = useState({
        style: {
            width: "0"
        },
        title: "Missing terms",
        text: "card-content red-text",
        line: "determinate red"
    })

    const settings = (arr) => {
        let notDoneL = 0
        let done = 0
        let weekDone = 0
        let allWeek = 0
        const today = new Date().getTime()
        for (let i = 0; i < arr.length; i++) {
            const newDate = new Date(arr[i].period).getTime()
            if ((today - newDate) < 604800000 &&(today - newDate) > 0 && arr[i].done) {
                weekDone++
            }
            if ((today - newDate) < 604800000 &&(today - newDate) > 0) {
                allWeek++
            }
            if (arr[i].done) {
                done++
            }
            if ((today - newDate) > 0 && !arr[i].done) {
                notDoneL++
            }
        }
        let weekPer = (weekDone / allWeek) * 100
        let allPer = (done / arr.length) * 100
        let notPer = (notDoneL / arr.length) * 100
        if(!Number.isInteger(weekPer)){
            weekPer = weekPer.toFixed(2)
        }
        if(!Number.isInteger(allPer)){
            allPer= allPer.toFixed(2)
        }
        if(!Number.isInteger(notPer)){
           notPer = notPer.toFixed(2)
        }
        if (!isNaN(weekPer) && !isNaN(allPer) && !isNaN(notPer)) {
            setWeek({...thisWeek, style: {width: `${weekPer}%`}})
            setAllTime({...allTime, style: {width: `${allPer}%`}})
            setNotDone({...notDone, style: {width: `${notPer}%`}})
        }
    }
    const getProfileInfo = useCallback(async () => {
        try {
            setPerson({})
            const data = await request("/api/client/profile", "GET", null, {Authorization: `Bearer ${auth.token}`})
            setPerson(data)
            setWar(data.warning)
        }catch (e) {
        }
    }, [request])

    const getStatisticInfo = async () => {
        const data = await request("/api/main/all", "GET", null, {Authorization: `Bearer ${auth.token}`})
        return data
    }

    const setCheck = async (val) =>{
        const res = await request("/api/client/warning","POST",{warning:val},{Authorization:`Bearer ${auth.token}`})
        makeBtnReq(!make_req)
        setWar(res.warning)
    }

    useEffect(() => {
        getProfileInfo()
        getStatisticInfo().then((body) => {
            setStatistic(body.todos)
            return body
        }).then((body) => {
            settings(body.todos)
        })
    }, [getProfileInfo,edit,make_req])

    if (loading) {
        return (
            <Loader/>
        )
    }
    return (<div className="row s12 m12 l12">
        <div className="col s12 m6 l6">
            {(!nullPerson && !edit) && <div className="col s12"><PersoneBox person={person} setCheck={setCheck}/></div>}
            {(edit || nullPerson) && <div className="col s12"><ProfileForm set={setNullPerson}/></div>}
            <div className=" col white-text offset-s4 offset-m4 offset-l4 name_txt">7-days-chart</div>
            <div className="col s12 l6 m6 graph">
                <SimpleAreaChart/>
            </div>
        </div>
        <div className="col s12 m6 l6 small_block">
            <DonePercent obj={thisWeek}/>
            <DonePercent obj={allTime}/>
            <DonePercent obj={notDone}/>
        </div>

    </div>)
}

const mapDispatchToProps = {
    setPerson, endEdit, confirmEdit, setStatistic,setWar,makeBtnReq
}

const mapStateToProps = (state) => {
    return {
        person: state.profile.person,
        edit: state.profile.confirmEdit,
        todos: state.profile.statistic,
        make_req:state.profile.make_req

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)