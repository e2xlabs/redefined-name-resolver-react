import { ResolverVendor } from "@redefined/name-resolver-js";

export type Account ={
  address: string;
  network: string;
  vendor: string;
  fetchedAt: number;
}

export type ReverseAccount = {
  domain: string,
  vendor: ResolverVendor,
  fetchedAt: number;
};

export type ResolveResponse = {
  data: Account[];
  fetchedAt: number;
  completeness: number;
  processedVendors: ResolverVendor[];
}

export type ReverseResponse = {
  data: ReverseAccount[];
  fetchedAt: number;
  completeness: number;
  processedVendors: ResolverVendor[];
}

export type DropDownProps = {
  active: boolean;
  resolveContent: Account[];
  reverseContent: ReverseAccount[];
  loading: boolean;
  error: string | Error;
  hiddenAddressGap?: HiddenAddressGap;
  onChange?: (value: TypedResult) => void;
  onClickOutside?: () => void;
}

export type ResolveItemProps = {
  item: Account;
  onChange?: (value: Account & { type: "resolve" }) => void;
}

export type ReverseItemProps = {
  item: ReverseAccount;
  onChange?: (value: ReverseAccount & { type: "reverse" }) => void;
}

export type Theme = "light" | "dark";
export type Type = "resolve" | "reverse" | "combined";

export type HiddenAddressGap = {
  leadingCharLimit: number;
  trailingCharLimit: number;
}

export type TypedResult = (Account | ReverseAccount) & { type: "resolve" | "reverse" }

export type ResolverOptions = {
  networks?: string[];
  vendors?: ResolverVendor[];
};

export interface RedefinedDomainResolverProps {
  theme?: Theme;
  type?: Type;
  width?: string;
  height?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  hiddenAddressGap?: HiddenAddressGap;
  resolverOptions?: ResolverOptions;
  placeholder?: string

  onUpdate(result: TypedResult): void;
}

export interface ContainerProps {
  width?: string;
}

export interface InputProps {
  height?: string;
  disabled?: boolean;
  isDropDownActive?: boolean;
}

export interface LogoProps {
  disabled?: boolean;
  inputHeight?: string;
}

export interface ITheme {
  colors: {
    background: string;
    primary: string;
    secondary: string;
    error: string;
    brandColor: string;
    disabled: string;
    hover: string;
    borderColor: string;
  }
}

export type Asset = {
  key: string;
  logo: string;
  name: string;
  symbol: string;
  type: string;
}
