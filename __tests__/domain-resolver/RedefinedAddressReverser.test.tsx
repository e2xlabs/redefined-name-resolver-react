import {render, screen} from "@testing-library/react"
import React from "react";
import {RedefinedAddressReverser} from "../../src/components";
import userEvent from "@testing-library/user-event";
import { RedefinedResolver, ReverseAccount } from "@redefined/name-resolver-js";
import _debounce from "lodash/debounce";

const domain = "myDomain";
const data = [
  {
    domain: "example",
    from: "redefined",
  },
  {
    domain: "example1",
    from: "ens",
  }
] as ReverseAccount[];
const mockChildComponent = jest.fn().mockResolvedValue([{val: "val"}]);
jest.mock("../../src/components/dropdown", () => (props) => {
  mockChildComponent(props);
  return <div data-testid="dropdown"/>;
});

const mockReverse = jest.fn();
jest.mock("@redefined/name-resolver-js", () => {
      return {
        RedefinedResolver: jest.fn().mockImplementation(() => {
          return { reverse: mockReverse }
        })
      }
    }
);

jest.mock("lodash/debounce");

jest.spyOn(React, 'useCallback').mockImplementation(f => f);

describe("RedefinedAddressReverser component", () => {

  beforeEach(() => {
    mockReverse.mockClear();
  });

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedAddressReverser onUpdate={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedAddressReverser onUpdate={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD change domain value IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedAddressReverser onUpdate={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "myDomain");

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();
  })


  it("SHOULD open dropdown IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedAddressReverser onUpdate={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  })

  it("SHOULD called DropDown component with props If DomainResolver is passed props", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedAddressReverser hiddenAddressGap={{leadingCharLimit: 5, trailingCharLimit: 6}} onUpdate={jest.fn()}/>);

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

    render(<RedefinedAddressReverser onUpdate={() => {}}/>);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();

    expect(RedefinedResolver).toBeTruthy();

  })

  it("SHOULD loading assets IF render component", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({mock: "mock"}),
        }),
    ) as jest.Mock;

    _debounce.mockImplementation(fn => fn);

    render(<RedefinedAddressReverser onUpdate={() => {}}/>);

    expect(global.fetch).toHaveBeenCalled();
  })
})