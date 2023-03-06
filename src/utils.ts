import EvmImage from "./assets/evm.svg"
import AptosImage from "./assets/aptos.svg"
import ArbitrumImage from "./assets/arbitrum.svg"
import AvalancheImage from "./assets/avalanche.svg"
import BscImage from "./assets/bsc.svg"
import BtcImage from "./assets/btc.svg"
import EthImage from "./assets/eth.svg"
import FantomImage from "./assets/fantom.svg"
import MoonBeamImage from "./assets/moonbeam.svg"
import NearImage from "./assets/near.svg"
import OptimismImage from "./assets/optimism.svg"
import PolygonImage from "./assets/polygon.svg"
import SolImage from "./assets/sol.svg"

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

export const CoinLogos = {
  eth: EthImage,
  matic: PolygonImage,
  avax: AvalancheImage,
  arbitrum: ArbitrumImage,
  optimism: OptimismImage,
  ftm: FantomImage,
  glmr: MoonBeamImage,
  btc: BtcImage,
  sol: SolImage,
  near: NearImage,
  apt: AptosImage,
  bsc: BscImage,
  evm: EvmImage
}