import { useState } from "react";
import CreationList from "../components/CreationList";

export default function Discover({}) {
    const [feed, setFeed] = useState([]);

    return (
        <>
            {feed.map(item =>
                <>
                    <div className="tab-title tab-selected">
                        {item.name}
                    </div>
                    <div className="tab-content">
                        
                    </div>
                </>    
            )}
        </>
    )
}