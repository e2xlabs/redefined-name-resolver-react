import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ResolveItem from "../../src/components/item-card/ResolveItem";
import { ResolveItemProps, Type } from "../../src/types";
import { lightTheme } from "../../src/styles/baseStyle";
import { ThemeProvider } from "styled-components";
import { RedefinedDomainResolverProvider } from "../../src/context/RedefinedDomainResolverContext";

const mockProps: ResolveItemProps = {
    item: {
        address: "0x12300000qt000b00000000000fdsoifj43roi34n",
        network: "MockNetwork",
        from: "MockResolverVendor",
    },
    onChange: jest.fn(),
};

const mockContext = {
    type: "combined" as Type,
    assets: [
        {
            key: "network1",
            logo: "network1-logo.png",
            name: "Network 1",
            symbol: "N1",
            type: "crypto",
        }
    ],
    hiddenAddressGap: {
        leadingCharLimit: 3,
        trailingCharLimit: 3,
    },
};

describe("ResolveItem component", () => {

    it("SHOULD renders correctly", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <ResolveItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const titleElement = getByText("0x1 ... 34n");
        const subTitleElement = getByText("MockResolverVendor");
        const fromElement = getByText("from:");
        expect(fromElement).toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();
        expect(subTitleElement).toBeInTheDocument();
    });

    it("SHOULD display abbreviated address with specified leading and trailing char limits", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext} hiddenAddressGap={{
                    leadingCharLimit: 6,
                    trailingCharLimit: 6
                }}>
                    <ResolveItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );

        const abbreviatedAddress = getByText("0x1230 ... roi34n");
        expect(abbreviatedAddress).toBeInTheDocument();
    });

    it("SHOULD calls onChange IF clicked", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <ResolveItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const itemWrapper = getByText("0x1 ... 34n");
        fireEvent.click(itemWrapper);
        expect(mockProps.onChange).toHaveBeenCalledWith(mockProps.item);
    });

    it("SHOULD copies text IF copy icon is clicked", () => {
        Object.assign(window.navigator, {
            clipboard: {
                writeText: jest.fn().mockImplementation(() => Promise.resolve()),
            },
        });

        const { getByRole } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <ResolveItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const copyIcon = getByRole("presentation");

        fireEvent.click(copyIcon);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProps.item.address);
    });
});
