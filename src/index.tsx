import React from 'react'
import ReactDOM from 'react-dom/client'
import RedefinedDomainResolver from "./components/domain-resolver";
import RedefinedDomainResolverReverse from "./components/domain-resolver-reverse";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <div style={{display:"flex"}}>
        <RedefinedDomainResolver onUpdate={() => {}} />
        <RedefinedDomainResolverReverse onUpdate={() => {}} />
      </div>
    </React.StrictMode>,
)
