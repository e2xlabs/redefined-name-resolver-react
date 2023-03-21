import React from 'react'
import ReactDOM from 'react-dom/client'
import {RedefinedDomainResolver} from "@redefined/name-resolver-react";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <h1 className={"title"}>Redefined Name Resolver React</h1>
      <h3 className={"subtitle"}>Type your domain in any box below</h3>
      <div className={"root"}>
        <div className={"container"}>
          <RedefinedDomainResolver
            theme={"light"}
            width={"50%"}
            onUpdate={(val) => console.log(val)}/>
          <RedefinedDomainResolver
            theme={"dark"}
            width={"50%"}
            onUpdate={(val) => console.log(val)}/>
        </div>
      </div>
    </React.StrictMode>,
)