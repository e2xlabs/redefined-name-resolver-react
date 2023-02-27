import React from 'react'
import ReactDOM from 'react-dom/client'
import {RedefinedDomainResolver} from "@redefined/name-resolver-react";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const ETH_GOERLI_NODE = "https://nameless-frequent-sea.ethereum-goerli.discover.quiknode.pro/251fd072d4269477a9053b036f131705359808f8/";
root.render(
    <React.StrictMode>
      <div className={"root"}>
        <div className={"container"}>
          <RedefinedDomainResolver
              theme={"light"}
              width={"50%"}
              resolverOptions={{
                nodes: {
                  eth: ETH_GOERLI_NODE
                }
              }}
              onSelect={(val) => console.log(val)}/>
          <RedefinedDomainResolver
              theme={"dark"}
              width={"50%"}
              resolverOptions={{
                nodes: {
                  eth: ETH_GOERLI_NODE
                }
              }}
              onSelect={(val) => console.log(val)}/>
        </div>
      </div>
    </React.StrictMode>,
)