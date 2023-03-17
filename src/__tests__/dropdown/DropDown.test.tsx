import {render, screen} from "@testing-library/react"
import React from "react";
import DropDown from "../../components/dropdown";
import {Account} from "@redefined/name-resolver-js";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../../styles/baseStyle";
import {getAbbreviatedAddress} from "../../utils";
import userEvent from "@testing-library/user-event";

describe("DropDown component", () => {
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

  it("SHOULD render component IF active = true", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    const dropDown = screen.getByTestId("dropdown");

    expect(dropDown).toBeInTheDocument();
  })

  it("SHOULD NOT render component IF active = false", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={false} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    const dropDown = screen.queryByTestId("dropdown");

    expect(dropDown).not.toBeInTheDocument();
  })

  it("SHOULD render content IF content is not empty", () => {
    const assets = {
      "eth": {
        "logo": "http://mock/assets/eth.svg",
        "name":"Ethereum",
        "symbol":"ETH",
        "type": "EVM"
      },
      "bsc": {
        "logo": "http://mock/assets/bsc.svg",
        "name": "Binance",
        "symbol": "BSC",
        "type": "EVM"
      }
    }
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown assets={assets} active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.getByRole("list");
    const from1 = screen.getByText(data[0].from);
    const address1 = screen.getByText(getAbbreviatedAddress(data[0].address));
    const from2 = screen.getByText(data[1].from);
    const address2 = screen.getByText(getAbbreviatedAddress(data[1].address));
    const logo1 = screen.getAllByAltText("coinLogo")[0];
    const logo2 = screen.getAllByAltText("coinLogo")[1];

    expect(list).toBeInTheDocument();
    expect(from1).toBeInTheDocument()
    expect(from2).toBeInTheDocument()
    expect(address1).toBeInTheDocument()
    expect(address2).toBeInTheDocument()
    expect(logo1.getAttribute("src")).toContain("http://mock/assets/bsc.svg")
    expect(logo2.getAttribute("src")).toContain("http://mock/assets/eth.svg")
  })

  it("SHOULD show no addresses found message IF content is empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={[]} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.queryByRole("list");
    const msg = screen.getByText("No addresses found");

    expect(list).not.toBeInTheDocument();
    expect(msg).toBeInTheDocument()
  })

  it("SHOULD NOT show no addresses found message IF content is not empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.queryByRole("list");
    const msg = screen.queryByText("No addresses found");

    expect(list).toBeInTheDocument();
    expect(msg).not.toBeInTheDocument()
  })

  it("SHOULD show error message IF error exist", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={[]} error={"ERROR"} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.queryByRole("list");
    const msg = screen.getByText("ERROR");

    expect(list).not.toBeInTheDocument();
    expect(msg).toBeInTheDocument()
  })

  it("SHOULD NOT show error message IF error does not exist", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={[]} error={"ERROR"} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.queryByRole("list");
    const msg = screen.getByText("ERROR");

    expect(list).not.toBeInTheDocument();
    expect(msg).toBeInTheDocument()
  })

  it("SHOULD show loader IF loading content", () => {
    jest.requireActual('react-loading');
    jest.doMock("react-loading", () => {
      return () => <div>Loading...</div>;
    });

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={true}/>
        </ThemeProvider>
    )

    const list = screen.queryByRole("list");
    const loader = screen.getByTestId("loader");

    expect(list).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument()
  })

  it("SHOULD abbreviate addresses IF content is not empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.getByRole("list");
    const element1 = screen.getByText(getAbbreviatedAddress(data[0].address));
    const element2 = screen.getByText(getAbbreviatedAddress(data[1].address));

    expect(list).toBeInTheDocument();
    expect(element1).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })

  it("SHOULD custom abbreviate addresses IF hiddenAddressGap is specified in props ", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown hiddenAddressGap={{leadingCharLimit: 5, trailingCharLimit: 8}} active={true} content={data}
                    error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.getByRole("list");
    const element1 = screen.getByText(getAbbreviatedAddress(data[0].address, 5, 8));
    const element2 = screen.getByText(getAbbreviatedAddress(data[1].address, 5, 8));

    expect(list).toBeInTheDocument();
    expect(element1).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })

  it("SHOULD call onChange IF click to 1 item", async () => {
    const onChange = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false} onChange={onChange}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(data[0].from)[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(data[0]);
  })

  it("SHOULD call onChange IF click to 2 item", async () => {
    const onChange = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false} onChange={onChange}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(data[1].from)[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(data[1]);
  })

  it("SHOULD copyAddress IF click to copy button on 1 item", async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByRole("presentation")[0]);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(data[0].address);
  })

  it("SHOULD copyAddress IF click to copy button on 2 item", async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByRole("presentation")[1]);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(data[1].address);
  })

  it("SHOULD call onClickOutside IF click to outside area", async () => {
    const onClickOutside = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} error={""} loading={false} onClickOutside={onClickOutside}/>
        </ThemeProvider>
    );

    await userEvent.click(document.body);

    expect(onClickOutside).toHaveBeenCalledTimes(1);
  })

  it("SHOULD NOT call onClickOutside IF click to component area", async () => {
    const onClickOutside = jest.fn();
    const onChange = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={data} onChange={onChange} error={""} loading={false} onClickOutside={onClickOutside}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(data[0].from)[0]);

    expect(onClickOutside).toHaveBeenCalledTimes(0);
  })

})
