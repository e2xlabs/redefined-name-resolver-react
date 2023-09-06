import React, { createContext, useContext } from 'react';
import { Asset, HiddenAddressGap, Type } from "../types";

const RedefinedDomainResolverContext = createContext({
    type: "combined",
    assets: [],
    hiddenAddressGap: {
        leadingCharLimit: 6,
        trailingCharLimit: 4
    }
});

export const RedefinedDomainResolverProvider = ({ type, assets, hiddenAddressGap, children }: {
    type: Type,
    assets: Asset[],
    hiddenAddressGap: HiddenAddressGap,
    children: any
}) => (
    <RedefinedDomainResolverContext.Provider value={{ type, assets, hiddenAddressGap }}>
        {children}
    </RedefinedDomainResolverContext.Provider>
);

export const useRedefinedDomainResolverContext = () => {
    const context = useContext(RedefinedDomainResolverContext);
    if (!context) {
        throw new Error("useRedefinedDomainResolverContext must be used within a RedefinedDomainResolverProvider");
    }
    return context;
};