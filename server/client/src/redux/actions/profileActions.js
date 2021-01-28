import {CONFIRM_EDIT, END_EDIT, SET_PERSON, SET_STATISTIC} from "../types/profileTypes";

export const confirmEdit = () =>{
    return{
        type : CONFIRM_EDIT
    }
}
export const endEdit= () =>{
    return{
        type: END_EDIT
    }
}

export const setPerson = (res) => {
    return{
        type :SET_PERSON,
        payload : res
    }
}

export const setStatistic = (stat) =>{
    return{
        type:SET_STATISTIC,
        payload:stat
    }
}

export const setWar =(val)=>{
    return{
        type:"SET_WAR",
        payload:val

    }
}

export const makeBtnReq = (val) =>{
    return{
        type:"MAKE_REQ",
        payload:val
    }
}

