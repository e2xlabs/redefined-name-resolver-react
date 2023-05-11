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

    const openRedefined = () => {
        openUrl("https://redefined.org")
    }

    const openTermsConditions = () => {
        openUrl("https://redefined.org/terms-conditions")
    }

    const openPrivacy = () => {
        openUrl("https://redefined.org/privacy")
    }

    return (
        <div className={`app`}>
            <div className={"app-bar"}>
                <div className={"logo-container"}>
                    <img className={"cursor-pointer"} src={require("./assets/logo.svg")} onClick={openRedefined} />
                    <span className={"theme-text"} style={{paddingTop: "2px"}}> : Search</span>
                </div>
                <div className={"dev-text-container cursor-pointer"} onClick={openDevGuide}>
                  <div className={"dev-text"}>Developer's Guide</div>
                  <img src={require("./assets/arrow.svg")} />
                </div>
            </div>
            <div className={"title"}><span>redefined’s Web3 Identity Resolver</span></div>
            <div className={"subtitle-container"}>
              <div className={"subtitle theme-text"}>
                Integrate redefined SDK or Widget to Search with any Social ID, Domain, Name Service, Email or Username
              </div>
            </div>
            <div className={"domain-resolver"}>
                <div className={"theme-btn-container"}>
                  <div className={"cursor-pointer"} onClick={swapTheme}>
                    {theme === "dark"
                      ? <img src={require("./assets/sun.svg")} />
                      : <img src={require("./assets/moon.svg")} />
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
            <div className={"footer"}>
                <div style={{ display: "flex" }}>
                    <div className={"cursor-pointer link"} onClick={openPrivacy}>Privacy Policy</div>
                    <div style={{ margin: "0 3px" }}>|</div>
                    <div className={"cursor-pointer link"} onClick={openTermsConditions}>Terms & Conditions</div>
                </div>
                <div>All rights reserved. © 2023 redefiend</div>
            </div>
        </div>
    )
}
