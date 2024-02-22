import React, { useContext } from "react";

export const TabCardContext = React.createContext();

export function useTabCard() {
    return useContext(TabCardContext);
}

export default function TabCard({ 
    color, 
    children
}) {
    return (
        <div>
            <TabCardContext.Provider value={{ color }}>
                {children}
            </TabCardContext.Provider>
        </div>
    )
}