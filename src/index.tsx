import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RedefinedDomainResolver from "./components/RedefinedDomainResolver";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RedefinedDomainResolver
      onSelect={(val) => console.log(`Your Address: ${val}`)}
      theme={"dark"}
      width={"40%"}
      autoFocus={false}
      disabled={false}
      hiddenAddressGap={{indexA: 3, indexB: 5}}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
