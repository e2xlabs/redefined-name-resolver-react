import { RedefinedDomainResolver } from "@redefined/name-resolver-react";
import React, { useState } from "react";

export default function App() {
    
    const currentlySupportUrl = "https://redefined.gitbook.io/connect/integerate-redefined/supported-providers";
    const devGuideUrl = "https://redefined.gitbook.io/connect/integerate-redefined/name-resolver-js-sdk";
    const redefinedOrgUrl = "https://redefined.org";
    const termsConditionsUrl = "https://redefined.org/terms-conditions";
    const privacyUrl = "https://redefined.org/privacy";
    const queryParameters = new URLSearchParams(window.location.search);
    const value = queryParameters.get("value");

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
        openUrl(currentlySupportUrl)
    }

    const openDevGuide = () => {
        openUrl(devGuideUrl)
    }

    const openRedefined = () => {
        openUrl(redefinedOrgUrl)
    }

    const openTermsConditions = () => {
        openUrl(termsConditionsUrl)
    }

    const openPrivacy = () => {
        openUrl(privacyUrl)
    }

    const updateQueryParam = (inputValue) => {
        queryParameters.set('value', inputValue);
        const newURL = `${window.location.pathname}?${queryParameters.toString()}`;
        window.history.pushState({}, '', newURL);
    };

    return (
        <div className={`app`}>
            <div className={"app-bar"}>
                <div className={"logo-container"}>
                    <img className={"cursor-pointer"} src={require("./assets/logo.svg")} onClick={openRedefined} />
                    <span className={"theme-text logo-subtext"}>: Search</span>
                </div>
                <div className={"dev-text-container cursor-pointer link"} onClick={openDevGuide}>
                  <div className={"dev-text"}>Developer's Guide</div>
                  <img src={require("./assets/arrow.svg")} />
                </div>
            </div>
            <div className={"title"}><span>redefined’s Web3 Identity Resolver</span></div>
            <div className={"subtitle-container"}>
              <div className={"subtitle theme-text"}>
                  Integrate redefined's API, SDK or Widget to Search with any Social ID, Domain, Name Service, Email, Username or Wallet addresses
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
                        defaultValue={value}
                        onUpdateInput={(val) => updateQueryParam(val)}
                    />
                </div>
                <div className={"dev-text-container support"}>
                    <div className={"dev-text cursor-pointer link"} onClick={openCurrentlySupport}>
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
