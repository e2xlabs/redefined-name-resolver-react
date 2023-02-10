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

export const getAbbreviatedAddress = (address: string): string => (
  `${address.substring(0, 6)} ... ${address.substring(address.length - 4, address.length)}`
);

export enum CoinLogos {
  ETH = "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
  BSC = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  SOL = "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  ZIL = "https://s2.coinmarketcap.com/static/img/coins/64x64/2469.png"
}