const initialState = {
    confirmEdit : false,
    person : {},
    statistic : [],
    useWar:null,
    make_req:false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONFIRM_EDIT":
            return  {...state,confirmEdit: true}
        case "END_EDIT":
            return  {...state,confirmEdit: false}
        case "SET_PERSON" :
            return  {...state,person: action.payload}
        case "SET_STATISTIC":
            return {...state,statistic: action.payload}
        case "SET_WAR":
            return  {...state,useWar:action.payload}
        case "MAKE_REQ":
            return  {...state,make_req: action.payload}
        default :
            return state
    }
}