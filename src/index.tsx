import React from 'react'
import ReactDOM from 'react-dom/client'
import RedefinedDomainResolver from "./components/domain-resolver";
import RedefinedAddressReverser from "./components/address-reverser";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <div style={{display:"flex"}}>
        <RedefinedDomainResolver onUpdate={() => {}} />
        <RedefinedAddressReverser onUpdate={() => {}} />
      </div>
    </React.StrictMode>,
)
