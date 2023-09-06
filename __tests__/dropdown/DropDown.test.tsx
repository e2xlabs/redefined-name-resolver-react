import React from "react";
import { render, fireEvent, getAllByText } from "@testing-library/react";
import { DropDownProps, ResolveItemProps, ReverseItemProps, Type } from "../../src/types";
import DropDown from "../../src/components/dropdown";
import { lightTheme } from "../../src/styles/baseStyle";
import { ThemeProvider } from "styled-components";
import { Account, ReverseAccount } from "@redefined/name-resolver-js";
import { RedefinedDomainResolverProvider } from "../../src/context/RedefinedDomainResolverContext";

jest.mock("../../src/components/item-card/ResolveItem", () => (props: ResolveItemProps) =>
    <div>{props.item.address + props.item.network}</div>);
jest.mock("../../src/components/item-card/ReverseItem", () => (props: ReverseItemProps) =>
    <div>{props.item.domain}</div>);
jest.mock("react-loading", () => () =>
    <div>Loading...</div>);

describe("DropDown component", () => {
    const mockResolveContent: Account[] = [
        { address: "Address1", network: "Network 1", from: "ResolverVendor1" },
        { address: "Address2", network: "Network 2", from: "ResolverVendor2" },
    ];

    const mockReverseContent: ReverseAccount[] = [
        { domain: "example.com", from: "ResolverVendor1" },
        { domain: "example.org", from: "ResolverVendor2" },
    ];

    const mockProps: DropDownProps = {
        active: true,
        resolveContent: mockResolveContent,
        reverseContent: mockReverseContent,
        loading: false,
        error: "",
        hiddenAddressGap: undefined,
        onChange: jest.fn(),
        onClickOutside: jest.fn(),
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

    it("SHOULD render correctly when active is true", () => {
        const { container } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );

        const dropdownElement = container.querySelector(".dropdown");
        expect(dropdownElement).toBeInTheDocument();
    });

    it("SHOULD not render when active is false", () => {
        const { container } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} active={false}/>
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        expect(container.firstChild).toBeNull();
    });

    it("SHOULD render loader when loading is true", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} loading={true}/>
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        const loaderElement = getByText("Loading...");
        expect(loaderElement).toBeInTheDocument();
    });

    it("SHOULD render resolveContent items when not loading and resolveContent has items", () => {
        const { getAllByText } = render(
            <RedefinedDomainResolverProvider {...mockContext}>
                <ThemeProvider theme={lightTheme}>
                    <DropDown {...mockProps}/>
                </ThemeProvider>
            </RedefinedDomainResolverProvider>
        );

        const resolveItems = getAllByText("Address", { exact: false });
        expect(resolveItems.length).toBe(2);
    });

    it("SHOULD render reverseContent items when not loading and reverseContent has items", () => {
        const { getAllByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );

        const reverseItems = getAllByText("example", { exact: false });
        expect(reverseItems.length).toBe(2);
    });

    it("SHOULD render not found message when neither resolveContent nor reverseContent has items and type resolve", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext} type={"resolve"}>
                    <DropDown {...mockProps} reverseContent={[]} resolveContent={[]} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        expect(getByText("No addresses found")).toBeInTheDocument();
    });

    it("SHOULD render not found message when neither resolveContent nor reverseContent has items and type resolve", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext} type={"reverse"}>
                    <DropDown {...mockProps} reverseContent={[]} resolveContent={[]} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        expect(getByText("No domains found")).toBeInTheDocument();
    });

    it("SHOULD render not found message when neither resolveContent nor reverseContent has items and type combined", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} reverseContent={[]} resolveContent={[]} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        expect(getByText("No addresses or domains found")).toBeInTheDocument();
    });

    it("SHOULD render error message when there is an error", () => {
        const { getByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} error={"Some error message"} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        expect(getByText("Some error message")).toBeInTheDocument();
    });

    it("SHOULD call onClickOutside when clicking outside the component", () => {
        const onClickOutside = jest.fn();
        render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} onClickOutside={onClickOutside}/>
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );
        fireEvent.click(document); // Simulate a click outside the component
        expect(onClickOutside).toHaveBeenCalled();
    });

    it("SHOULD render resolveContent items in sorted order by network", () => {

        const { getAllByText } = render(
            <ThemeProvider theme={lightTheme}>
                <RedefinedDomainResolverProvider {...mockContext}>
                    <DropDown {...mockProps} />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        );

        const resolveItems = getAllByText("Network", { exact: false, trim: true });
        expect(resolveItems.length).toBe(2);

        const sortedNetworks = mockResolveContent
            .map((item) => item.network)
            .sort((a, b) => a.localeCompare(b));

        resolveItems.forEach((item, index) => {
            expect(item).toHaveTextContent(sortedNetworks[index]);
        });
    });

});
