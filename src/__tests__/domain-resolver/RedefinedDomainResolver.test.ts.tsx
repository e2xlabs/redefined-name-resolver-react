import {render, screen} from "@testing-library/react"
import React from "react";
import {RedefinedDomainResolver} from "../../components";
import userEvent from "@testing-library/user-event";
import {Account, RedefinedResolver} from "@redefined/name-resolver-js";
import _debounce from "lodash/debounce";

const domain = "myDomain";
const data = [
  {
    address: "0x123ffdsoin23e23nod23i14",
    from: "redefined",
    network: "bsc"
  },
  {
    address: "0x321ffdsfgor3e23nod23i14",
    from: "ens",
    network: "eth"
  }
] as Account[];
const mockChildComponent = jest.fn().mockResolvedValue([{dfds: "fdsfs"}]);
jest.mock("../../components/dropdown", () => (props) => {
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

const playSoundFileMock = jest
    .spyOn(RedefinedResolver.prototype, 'resolve')
    .mockImplementation(async (domain: string) => {
      return new Promise((resolve) => {resolve(data)})
    });

jest.mock("lodash/debounce");

jest.spyOn(React, 'useCallback').mockImplementation(f => f);

describe("RedefinedDomainResolver component", () => {

  beforeEach(() => {
    mockResolve.mockClear();
  });

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedDomainResolver onSelect={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedDomainResolver onSelect={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD change domain value IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolver onSelect={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "myDomain");

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();
  })


  it("SHOULD open dropdown IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolver onSelect={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  })

  it("SHOULD called DropDown component with props If DomainResolver is passed props", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolver hiddenAddressGap={{leadingCharLimit: 5, trailingCharLimit: 6}}
                                    onSelect={jest.fn()}/>);

    expect(mockChildComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          active: false,
          loading: false,
          error: "",
          content: [],
          hiddenAddressGap: {leadingCharLimit: 5, trailingCharLimit: 6},
        })
    );
  })

  it("SHOULD loading account IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolver onSelect={() => {
    }}/>);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();

    expect(RedefinedResolver).toBeTruthy();
    expect(playSoundFileMock).toBe(domain);

    // expect(mockChildComponent).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       active: true,
    //       loading: false,
    //       error: "",
    //       content: [{"q": 123}],
    //     })
    // );
  })
})