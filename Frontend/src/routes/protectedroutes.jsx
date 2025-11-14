import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../components/common/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../components/constants/constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {  
    const [isAuthorized, setIsAuthorized] = useState(null);  

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {  
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const resp = await api.post("/api/token/refresh/", {  
                refresh: refreshToken
            });
            
            if (resp.status === 200) {  
                localStorage.setItem(ACCESS_TOKEN, resp.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log("Token refresh error:", error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                // Token expired, try to refresh
                await refreshToken();
            } else {
                // Token is still valid
                setIsAuthorized(true);
            }
        } catch (error) {
            // Token is invalid
            console.log("Token decode error:", error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '1.2rem'
            }}>
                Loading...
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to="/login" />;  
}

export default ProtectedRoute;