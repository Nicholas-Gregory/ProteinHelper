import React, { useContext, useEffect, useState } from 'react';
import { apiCall } from '../utils/http';

const LOCAL_STORAGE_KEY = 'protein-helper.auth-token';

export const UserContext = React.createContext();

export function useAuth() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState({});

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
                setUser({});
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
        setUser({});

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

    async function updateGoals(goals) {
        const response = await apiCall('PUT', `/user/${user.id}`, { goals }, authorize());

        if (!response.error) {
            setUser({
                ...user,
                goals: [...response.goals]
            });
        }

        return response;
    }

    return (
        <UserContext.Provider 
            value={{
                user,
                login, logout,
                signup,
                authorize,
                updateGoals
            }
        }>
            {children}
        </UserContext.Provider>
    )
}