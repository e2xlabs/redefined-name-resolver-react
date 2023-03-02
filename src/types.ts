import {Account, ResolverOptions} from "@redefined/name-resolver-js";

export type DropdownProps = {
  active: boolean;
  content: Account[];
  loading: boolean;
  error: string | Error;
  hiddenAddressGap?: HiddenAddressGap;
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

  onSelect(account: Account): void;
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