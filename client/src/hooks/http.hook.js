import React, {useCallback, useState} from "react"
import axios from "axios";
import {useHistory} from "react-router-dom"
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()
    const request = useCallback(async (url, method="GET",body=null,headers={})=>{
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await axios({url, method, body, headers})
            const data = await response.json()
            if (!response.ok && data.message!=="Not authorized!") {
                throw new Error(data.message || "Something go wrong!")
            }
            if (data.message === "Not authorized!") {
                localStorage.clear()
                window.location.reload()
                history.push("/login")
            }
            setLoading(false)
            return data
        }catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])
    const clearError = useCallback(()=> setError(null),[])
    return {loading,error,request,clearError}
}