import React from 'react'
import ReactDOM from 'react-dom/client'
import RedefinedDomainResolver from "./components/domain-resolver";
import momentDurationFormatSetup from "moment-duration-format";
import moment from "moment";

momentDurationFormatSetup(moment);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RedefinedDomainResolver type="combined" onUpdate={(item) => {console.log(item)}} />
    </React.StrictMode>,
)
