import { RedefinedDomainResolver } from "@redefined/name-resolver-react";
import React, { useState } from "react";

export default function App() {

    const [theme, setTheme] = useState<"light" | "dark">("dark");

    const swapTheme = () => {
        switch (theme) {
            case "light":
                setTheme("dark");
                return;
            case "dark":
                setTheme("light");
                return;
        }
    }

    const openUrl = (url: string) => {
        window.open(url, "blank");
    }

    const openCurrentlySupport = () => {
        openUrl("https://redefined.gitbook.io/connect/integerate-redefined/supported-providers")
    }

    const openDevGuide = () => {
        openUrl("https://redefined.gitbook.io/connect/integerate-redefined/name-resolver-js-sdk")
    }

    return (
        <div className={`app ${theme}`}>
            <div className={"app-bar"}>
                <div className={"logo-container"}>
                    <img src={require("./assets/logo.svg")} />
                    <span className={"theme-text"}> : Search</span>
                </div>
                <div className={"dev-text-container cursor-pointer"} onClick={openDevGuide}>
                  <div className={"dev-text"}>Developer`s Guide</div>
                  <img src={require("./assets/arrow.svg")} />
                </div>
            </div>
            <span className={"title"}>redefined’s Web3 Identity Resolver</span>
            <div className={"subtitle-container"}>
              <div className={"subtitle theme-text"}>
                Integrate redefined SDK or Widget to Search with any Social ID, Domain, Name Service, Email or Username
              </div>
            </div>
            <div className={"domain-resolver"}>
                <div className={"theme-btn-container"}>
                  <div className={"cursor-pointer"} onClick={swapTheme}>
                    {theme === "dark"
                      ? <img src={require("./assets/dark.svg")} />
                      : <img src={require("./assets/light.svg")} />
                    }
                  </div>
                </div>
                <div className={"domain-resolver-container"}>
                    <RedefinedDomainResolver
                        theme={theme}
                        width={"90%"}
                        onUpdate={(val) => console.log(val)}
                    />
                </div>
                <div className={"dev-text-container support"}>
                    <div className={"dev-text cursor-pointer"} onClick={openCurrentlySupport}>
                      <div>Currently Support</div>
                      <img src={require("./assets/arrow.svg")} />
                    </div>
                </div>
            </div>
        </div>
    )
}
