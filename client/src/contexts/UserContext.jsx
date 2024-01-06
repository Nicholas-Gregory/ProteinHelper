import React, { useContext, useState } from 'react';

export const UserContext = React.createContext();

export function useAuth() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function login() {
         setUser({ name: 'n' });
    }

    function logout() {
        setUser(null);

        localStorage.removeItem('protein-helper.auth-token');
    }

    async function signup() {

    }

    async function authorize() {

    }

    return (
        <UserContext.Provider value={{
            user,
            login, logout,
            signup,
            authorize
        }}>
            {children}
        </UserContext.Provider>
    )
}