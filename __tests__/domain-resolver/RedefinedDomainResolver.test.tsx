import { render, screen } from "@testing-library/react"
import React from "react";
import userEvent from "@testing-library/user-event";
import { RedefinedResolver } from "@redefined/name-resolver-js";
import _debounce from "lodash/debounce";
import RedefinedDomainResolver from "../../src/components/domain-resolver";

const mockChildComponent = jest.fn().mockResolvedValue([{ dfds: "fdsfs" }]);
jest.mock("../../src/components/dropdown", () => (props) => {
    mockChildComponent(props);
    return <div data-testid="dropdown"/>;
});

const mockResolve = jest.fn();
jest.mock("@redefined/name-resolver-js", () => {
        return {
            RedefinedResolver: jest.fn().mockImplementation(() => {
                return { resolve: mockResolve }
            })
        }
    }
);

jest.mock("lodash/debounce");

jest.spyOn(React, 'useCallback').mockImplementation(f => f);

describe("RedefinedDomainResolver component", () => {
    const domain = "myDomain";

    beforeEach(() => {
        mockResolve.mockClear();
    });

    it("SHOULD render input with log IF mount component", () => {
        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        const logo = screen.getByAltText("logo");
        const input = screen.getByRole("textbox");

        expect(logo).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    })

    it("SHOULD render input with log IF mount component", () => {
        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        const logo = screen.getByAltText("logo");
        const input = screen.getByRole("textbox");

        expect(logo).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    })

    it("SHOULD change domain value IF typing text", async () => {
        _debounce.mockImplementation(fn => fn);

        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

        const input = screen.getByRole("textbox");

        await userEvent.type(input, "myDomain");

        expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();
    })


    it("SHOULD open dropdown IF typing text", async () => {
        _debounce.mockImplementation(fn => fn);

        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

        const input = screen.getByRole("textbox");

        await userEvent.type(input, domain);

        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    })

    it("SHOULD called DropDown component with props If DomainResolver is passed props", async () => {
        _debounce.mockImplementation(fn => fn);

        render(
            <RedefinedDomainResolver
                type={"resolve"}
                hiddenAddressGap={{ leadingCharLimit: 5, trailingCharLimit: 6 }}
                onUpdate={jest.fn()}
            />
        );

        expect(mockChildComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                active: false,
                loading: false,
                error: "",
                resolveContent: [],
                reverseContent: [],
            })
        );
    })

    it("SHOULD loading account IF typing text", async () => {
        _debounce.mockImplementation(fn => fn);

        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        const input = screen.getByRole("textbox");

        await userEvent.type(input, domain);

        expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();

        expect(RedefinedResolver).toBeTruthy();

    })

    it("SHOULD loading assets IF render component", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ mock: "mock" }),
            }),
        ) as jest.Mock;

        _debounce.mockImplementation(fn => fn);

        render(
            <RedefinedDomainResolver onUpdate={() => {}}/>
        );

        expect(global.fetch).toHaveBeenCalled();
    })
})