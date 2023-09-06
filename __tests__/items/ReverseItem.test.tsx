import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReverseItem from "../../src/components/item-card/ReverseItem";
import { ReverseItemProps, Type } from "../../src/types";
import { lightTheme } from "../../src/styles/baseStyle";
import { ThemeProvider } from "styled-components";
import { RedefinedDomainResolverProvider } from "../../src/context/RedefinedDomainResolverContext";

const mockProps: ReverseItemProps = {
    item: {
        domain: "example",
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

describe("ReverseItem component", () => {

    it("SHOULD renders correctly", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <ReverseItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const titleElement = getByText("example");
        const subTitleElement = getByText("MockResolverVendor");
        const fromElement = getByText("from:");
        expect(fromElement).toBeInTheDocument();
        expect(titleElement).toBeInTheDocument();
        expect(subTitleElement).toBeInTheDocument();
    });

    it("SHOULD calls onChange IF clicked", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <ReverseItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const itemWrapper = getByText("example");
        fireEvent.click(itemWrapper);
        expect(mockProps.onChange).toHaveBeenCalledWith({ ...mockProps.item, type: "reverse" });
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
                    <ReverseItem {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const copyIcon = getByRole("presentation");

        fireEvent.click(copyIcon);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProps.item.domain);
    });
});
