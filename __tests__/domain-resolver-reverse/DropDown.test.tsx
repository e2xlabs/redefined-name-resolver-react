import {render, screen} from "@testing-library/react"
import React from "react";
import { ReverseAccount } from "@redefined/name-resolver-js";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../../src/styles/baseStyle";
import userEvent from "@testing-library/user-event";
import DropDown from "../../src/components/domain-resolver-reverse/DropDown";

describe("DropDown component", () => {
  const reversedData = [
    {
      domain: "example",
      from: "redefined",
    },
    {
      domain: "example2",
      from: "ens",
    }
  ] as ReverseAccount[];

  it("SHOULD render component IF active = true", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    const dropDown = screen.getByTestId("dropdown");

    expect(dropDown).toBeInTheDocument();
  })

  it("SHOULD NOT render component IF active = false", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={false} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    const dropDown = screen.queryByTestId("dropdown");

    expect(dropDown).not.toBeInTheDocument();
  })

  it("SHOULD render content IF content is not empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.getByRole("list");
    const from1 = screen.getByText(reversedData[0].from);
    const domain1 = screen.getByText(reversedData[0].domain);
    const from2 = screen.getByText(reversedData[1].from);
    const domain2 = screen.getByText(reversedData[1].domain);

    expect(list).toBeInTheDocument();
    expect(from1).toBeInTheDocument()
    expect(from2).toBeInTheDocument()
    expect(domain1).toBeInTheDocument()
    expect(domain2).toBeInTheDocument()
  })

  it("SHOULD show no domains found message IF content is empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={[]} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.queryByRole("list");
    const msg = screen.getByText("No domains found");

    expect(list).not.toBeInTheDocument();
    expect(msg).toBeInTheDocument()
  })

  it("SHOULD NOT show no domains found message IF content is not empty", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
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
          <DropDown active={true} content={reversedData} error={""} loading={true}/>
        </ThemeProvider>
    )

    const list = screen.queryByRole("list");
    const loader = screen.getByTestId("loader");

    expect(list).not.toBeInTheDocument();
    expect(loader).toBeInTheDocument()
  })

  it("SHOULD show domain IF content has account", () => {
    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    const list = screen.getByRole("list");
    const element1 = screen.getByText(reversedData[0].domain);
    const element2 = screen.getByText(reversedData[1].domain);

    expect(list).toBeInTheDocument();
    expect(element1).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })

  it("SHOULD call onChange IF click to 1 item", async () => {
    const onChange = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false} onChange={onChange}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(reversedData[0].from)[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(reversedData[0]);
  })

  it("SHOULD call onChange IF click to 2 item", async () => {
    const onChange = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false} onChange={onChange}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(reversedData[1].from)[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(reversedData[1]);
  })

  it("SHOULD copyAddress IF click to copy button on 1 item", async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByRole("presentation")[0]);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(reversedData[0].domain);
  })

  it("SHOULD copyAddress IF click to copy button on 2 item", async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByRole("presentation")[1]);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(reversedData[1].domain);
  })

  it("SHOULD call onClickOutside IF click to outside area", async () => {
    const onClickOutside = jest.fn();

    render(
        <ThemeProvider theme={lightTheme}>
          <DropDown active={true} content={reversedData} error={""} loading={false} onClickOutside={onClickOutside}/>
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
          <DropDown active={true} content={reversedData} onChange={onChange} error={""} loading={false} onClickOutside={onClickOutside}/>
        </ThemeProvider>
    );

    await userEvent.click(screen.getAllByText(reversedData[0].from)[0]);

    expect(onClickOutside).toHaveBeenCalledTimes(0);
  })

})
