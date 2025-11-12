import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {api} from "../common/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../common/constant";
import { useState, useEffect} from "react";


function PrivateRoute({Children}) {
    const [IsAuthorized, setIsAuthorized] = useState(null)

    useEffect( () => {
        auth().catch( () => setIsAuthorized(false) )
    }, [])

    const refresh_token = async () => {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN)

        try {
            const resp = api.post("/api/token/refresh/", {
                refresh: refresh_token
            })
            if (resp === 200) {
                localStorage.setItem(ACCESS_TOKEN, resp.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch (error){
            console.log(error)
            setIsAuthorized(false)
        }      
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenexpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenexpiration < now ) {
            await refresh_token()
        }
        else {
            setIsAuthorized(true)
        }
     }
    if (IsAuthorized === null) {
        return <div>Loading ......</div>
    }
    return IsAuthorized ? Children : <Navigate to = 'login'/>
}


export default PrivateRoute;