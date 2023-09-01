import {render, screen} from "@testing-library/react"
import React from "react";
import userEvent from "@testing-library/user-event";
import { RedefinedResolver } from "@redefined/name-resolver-js";
import _debounce from "lodash/debounce";
import { RedefinedDomainResolverReverse } from "../../src/components";

const domain = "myDomain";
const mockChildComponent = jest.fn().mockResolvedValue([{val: "val"}]);
jest.mock("../../src/components/domain-resolver-reverse/DropDown", () => (props) => {
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

describe("RedefinedDomainResolverReverse component", () => {

  beforeEach(() => {
    mockReverse.mockClear();
  });

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedDomainResolverReverse onUpdate={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD render input with log IF mount component", () => {
    render(<RedefinedDomainResolverReverse onUpdate={() => {
    }}/>);

    const logo = screen.getByAltText("logo");
    const input = screen.getByRole("textbox");

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("SHOULD change domain value IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolverReverse onUpdate={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "myDomain");

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();
  })


  it("SHOULD open dropdown IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolverReverse onUpdate={() => {
    }}/>);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeNull();

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  })

  it("SHOULD called DropDown component with props If DomainResolver is passed props", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolverReverse onUpdate={jest.fn()}/>);

    expect(mockChildComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          active: false,
          loading: false,
          error: "",
          content: [],
        })
    );
  })

  it("SHOULD loading account IF typing text", async () => {
    _debounce.mockImplementation(fn => fn);

    render(<RedefinedDomainResolverReverse onUpdate={() => {}}/>);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, domain);

    expect(screen.queryByDisplayValue(/myDomain/)).toBeInTheDocument();

    expect(RedefinedResolver).toBeTruthy();

  })
})