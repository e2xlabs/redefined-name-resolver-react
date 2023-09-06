import React from 'react';
import { render, screen } from '@testing-library/react';
import {
    RedefinedDomainResolverProvider,
    useRedefinedDomainResolverContext
} from "../../src/context/RedefinedDomainResolverContext";

describe('RedefinedDomainResolverContext', () => {
    it('SHOULD provide default values', () => {
        const TestComponent = () => {
            const context = useRedefinedDomainResolverContext();
            return (
                <div>
                    <div data-testid="type">{context.type}</div>
                    <div data-testid="assets">{JSON.stringify(context.assets)}</div>
                    <div data-testid="hiddenAddressGap">{JSON.stringify(context.hiddenAddressGap)}</div>
                </div>
            );
        };

        render(
            <RedefinedDomainResolverProvider type="resolve" assets={[]} hiddenAddressGap={{ leadingCharLimit: 3, trailingCharLimit: 3 }}>
                <TestComponent />
            </RedefinedDomainResolverProvider>
        );

        expect(screen.getByTestId('type')).toHaveTextContent('resolve');
        expect(screen.getByTestId('assets')).toHaveTextContent('[]');
        expect(screen.getByTestId('hiddenAddressGap')).toHaveTextContent('{"leadingCharLimit":3,"trailingCharLimit":3}');
    });

    it('SHOULD provide values passed to the provider', () => {
        const TestComponent = () => {
            const context = useRedefinedDomainResolverContext();
            return (
                <div>
                    <div data-testid="type">{context.type}</div>
                    <div data-testid="assets">{JSON.stringify(context.assets)}</div>
                    <div data-testid="hiddenAddressGap">{JSON.stringify(context.hiddenAddressGap)}</div>
                </div>
            );
        };

        render(
            <RedefinedDomainResolverProvider type="combined" assets={[{ key: 'network1', logo: 'network1-logo.png', name: 'Network 1', symbol: 'N1', type: 'crypto' }]} hiddenAddressGap={{ leadingCharLimit: 6, trailingCharLimit: 4 }}>
                <TestComponent />
            </RedefinedDomainResolverProvider>
        );

        expect(screen.getByTestId('type')).toHaveTextContent('combined');
        expect(screen.getByTestId('assets')).toHaveTextContent('[{"key":"network1","logo":"network1-logo.png","name":"Network 1","symbol":"N1","type":"crypto"}]');
        expect(screen.getByTestId('hiddenAddressGap')).toHaveTextContent('{"leadingCharLimit":6,"trailingCharLimit":4}');
    });
});
