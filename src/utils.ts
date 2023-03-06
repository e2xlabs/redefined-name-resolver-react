import EvmImage from "./assets/evm.png"

export const getErrorMessage = (error?: string | Error, disabled?: boolean) => {
  if (!error || disabled) return "";
  if (error instanceof Error) return error.message;
  return error;
}

export const copyText = (text: string): void => {
  navigator.clipboard.writeText(text).catch(function (err) {
    console.error('Could not copy text: ', err);
  });
};

export const getAbbreviatedAddress = (address: string, leadingCharLimit: number = 6, trailingCharLimit: number = 4): string => (
  `${address.substring(0, leadingCharLimit)} ... ${address.substring(address.length - trailingCharLimit, address.length)}`
);

export const CoinLogos = {
  ETH: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  BSC: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  SOL: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  ZIL: "https://s2.coinmarketcap.com/static/img/coins/64x64/2469.png",
  EVM: EvmImage
}