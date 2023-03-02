# Redefined-Name-Resolver-React

Simple input component that will help resolve domains on services such as [Redefined](https://redefined.org/), [ENS](https://ens.domains/) and [Unstoppable](https://unstoppabledomains.com/).

See [redefined-name-resolver-react](https://) for live demos.

***redefined-name-resolver-react*** is founded by [E2xLabs](https://).
We will be glad to see the integration of our library in other services.

Features include:

- The ability to find addresses in 3 services at once
- Copy the address of the found domain
- And if you are a developer, then just pass a function to the props and do whatever you want with the address

# Installation and usage

The easiest way to use react-select is to install it from npm and build it into your app with Webpack.

```
npm i redefined-name-resolver-react
```

Then use it in your app:

```js
import React from 'react';
import {RedefinedDomainResolver} from "@redefined/name-resolver-react";

export default function App() {
  return (
    <div className="App">
        <RedefinedDomainResolver onSelect={(address) => console.log(address)} />
    </div>
  );
}
```

## Props

Common props you may want to specify include:

- `autoFocus: boolean` - focus the control when it mounts
- `theme: "dark" | "light"` - apply a dark or light theme to the component
- `width: string` - set component width
- `disabled: boolean` - disable the control
- `onSelect: (address: string) => void` - subscribe to select event
- `hiddenAddressGap: { leadingCharLimit: number; trailingCharLimit: number; }` - specify the size of the address hidden. For example, for an address with the following parameters `hiddenAddressGap={{leadingCharLimit: 4, trailingCharLimit: 6}}` you can see following result: `0x6B ... D55d04`
- `resolverOptions` - change the resolver options for [Resolver engine](https://github.com/e2xlabs/redefined-name-resolver-js) such as specify resolver services or set nodes

## License

MIT Licensed.