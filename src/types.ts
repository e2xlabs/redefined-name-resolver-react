import { Account, ResolverOptions, ReverseAccount } from "@redefined/name-resolver-js";

export type DropdownProps = {
  active: boolean;
  content: Account[] | ReverseAccount[];
  loading: boolean;
  error: string | Error;
  hiddenAddressGap?: HiddenAddressGap;
  assets?: Asset[];
  onChange?: (value: Account) => void;
  onClickOutside?: () => void;
}

export type Theme = "light" | "dark"

type HiddenAddressGap = {
  leadingCharLimit: number;
  trailingCharLimit: number;
}

export interface RedefinedDomainResolverProps {
  theme?: Theme;
  width?: string;
  height?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  hiddenAddressGap?: HiddenAddressGap;
  resolverOptions?: ResolverOptions;
  placeholder?: string

  onUpdate(account: Account | null): void;
}

export interface RedefinedAddressReverserProps {
  theme?: Theme;
  width?: string;
  height?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  hiddenAddressGap?: HiddenAddressGap;
  resolverOptions?: ResolverOptions;
  placeholder?: string

  onUpdate(account: Account | null): void;
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
