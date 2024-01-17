import React, { useContext, useEffect, useState } from 'react';
import { apiCall } from '../utils/http';

const LOCAL_STORAGE_KEY = 'protein-helper.auth-token';

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
                const response = await apiCall('GET', '/auth/authorize', null, token);

                if (response.error) {
                    logout();
                    return;
                }

                setUser(response);
            })();
        }

        const listener = e => {
            const { key } = e;

            if (key === null) {
                setUser(null);
            }
        }
        window.addEventListener('storage', listener);

        return () => {
            window.removeEventListener('storage', listener);
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

    async function signup(data) {
        const response = await apiCall('POST', '/auth/create', data);

        if (!response.error) {
            localStorage.setItem(LOCAL_STORAGE_KEY, response.token);

            setUser(response.user);
        }

        return response;
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