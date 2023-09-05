import { Account, ResolverOptions, ReverseAccount } from "@redefined/name-resolver-js";

export type DropDownProps = {
  type: Type;
  active: boolean;
  resolveContent: Account[];
  reverseContent: ReverseAccount[];
  loading: boolean;
  error: string | Error;
  hiddenAddressGap?: HiddenAddressGap;
  assets?: Asset[];
  onChange?: (value: Account | ReverseAccount) => void;
  onClickOutside?: () => void;
}

export type ResolveItemProps = {
  item: Account;
  assets: Asset[];
  hiddenAddressGap?: HiddenAddressGap;
  onChange?: (value: Account) => void;
}

export type ReverseItemProps = {
  item: ReverseAccount;
  onChange?: (value: ReverseAccount) => void;
}

export type Theme = "light" | "dark";
export type Type = "resolve" | "reverse" | "combined";

type HiddenAddressGap = {
  leadingCharLimit: number;
  trailingCharLimit: number;
}

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

  onUpdate(account: Account | ReverseAccount): void;
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
