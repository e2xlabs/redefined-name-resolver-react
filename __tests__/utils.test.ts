import {copyText, getAbbreviatedAddress, getErrorMessage} from "../src/utils";

describe("utils", () => {
  const address = "0x12300000qt000b00000000000fdsoifj43roi34n";

  it("SHOULD return abbreviated address IF default limits", () => {
    expect(getAbbreviatedAddress(address)).toEqual("0x1230 ... i34n");
  })

  it("SHOULD return abbreviated address IF specify limits", () => {
    expect(getAbbreviatedAddress(address, 2, 7)).toEqual("0x ... 3roi34n");
  })

  it('SHOULD copy text to buffer IF if everything is fine', async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    await copyText(address);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address);
  });

  it('SHOULD print error to console IF catch error when copying', async () => {
    const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.reject()),
      },
    });

    await copyText(address);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('SHOULD return error message IF error is string',() => {
    expect(getErrorMessage("error")).toEqual("error");
  });

  it('SHOULD return error message IF error is Error',() => {
    expect(getErrorMessage(new Error("ERROR"))).toEqual("ERROR");
  });

  it('SHOULD return empty message IF error is undefined',() => {
    expect(getErrorMessage()).toEqual("");
  });

})