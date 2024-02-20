import React, { useContext } from "react";

export const TabNavContext = React.createContext();

export function useTabNav() {
    return useContext(TabNavContext);
}

export default function TabNav({ 
    onClick,
    children 
}) {
    return (
        <TabNavContext.Provider
            value={{ onClick }}
        >
            {children}
        </TabNavContext.Provider>
    )
}