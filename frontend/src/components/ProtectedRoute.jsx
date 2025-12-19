import React, { useEffect } from 'react'
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute({ children }) {

    const [isAuthorized, setIsAuthorized] = React.useState(null);

    useEffect(() => {
        checkAuthorization().catch(error => {
            setIsAuthorized(false);
            console.error("Error checking authorization:", error);
        });
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }
        try {
            const response = await api.post('api/token/refresh/', {
                refresh: refreshToken
            });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            setIsAuthorized(false);
        }
    }

    const checkAuthorization = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            setIsAuthorized(false);
            return;
        }
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const tokenExpiry = decodedToken.exp;
        const now = Date.now() / 1000;
        if (tokenExpiry < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute
