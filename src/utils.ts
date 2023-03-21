export const getErrorMessage = (error?: string | Error) => {
  if (!error) return "";
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