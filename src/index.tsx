import React from 'react'
import ReactDOM from 'react-dom/client'
import RedefinedDomainResolver from "./components/domain-resolver";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RedefinedDomainResolver theme={"dark"} onUpdate={() => {}} />
    </React.StrictMode>,
)
