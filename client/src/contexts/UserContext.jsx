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

    async function logout() {
        setUser(null);
    }

    async function signup() {

    }

    return (
        <UserContext.Provider value={{
            user,
            login, logout,
            signup
        }}>
            {children}
        </UserContext.Provider>
    )
}