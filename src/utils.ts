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
    `${address.substring(0, 12)}...${address.substring(address.length - 5, address.length)}`
);