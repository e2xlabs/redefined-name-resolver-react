import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RedefinedDomainResolver from "./field/RedefinedDomainResolver";
import { RedefinedResolver } from "redefined-resolver";

const resolver = new RedefinedResolver();
//
// resolver.resolve('ik@soft.com', "eth").then((val) => {
//   console.log("RESPONSE", val)
// }).catch(console.error);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RedefinedDomainResolver />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
