import React, { useContext, useEffect, useState } from 'react';
import { apiCall } from '../utils/http';

export const LOCAL_STORAGE_KEY = 'protein-helper.auth-token';

export const UserContext = React.createContext();

export function useAuth() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = authorize();

        if (token) {
            (async () => {
                setUser(await apiCall('GET', '/auth/authorize', null, token));
            })();
        }
    }, []);

    async function login(data) {
         const response = await apiCall('POST', '/auth/login', data);

         if (!response.error) {
            localStorage.setItem(LOCAL_STORAGE_KEY, response.token);

            setUser(response.user);
         }

         return response;
    }

    function logout() {
        setUser(null);

        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    async function signup() {

    }

    function authorize() {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    }

    return (
        <UserContext.Provider 
            value={{
                user,
                login, logout,
                signup,
                authorize
            }
        }>
            {children}
        </UserContext.Provider>
    )
}