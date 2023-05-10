import { RedefinedDomainResolver } from "@redefined/name-resolver-react";
import React, { useState } from "react";

export default function App() {
    
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    
    return (
        <div className={`app ${theme}`}>
            <div className={"app-bar"}>
                logo : Search
                
                <div className={"dev-guide"}>Developer`s Guide</div>
            </div>
            <span className={"title"}>redefined’s Web3 Identity Resolver</span>
            <div className={"subtitle"}>Integrate redefined SDK or Widget to Search with any Social ID, Domain, Name Service, Email or Username</div>
            <div className={"domain-resolver"}>
                <div className={"domain-resolver-container"}>
                    <RedefinedDomainResolver
                        theme={theme}
                        width={"50%"}
                        onUpdate={(val) => console.log(val)}/>
                </div>
            </div>
        </div>
    )
}
