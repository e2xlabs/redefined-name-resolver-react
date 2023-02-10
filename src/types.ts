import {Account} from "redefined-resolver";

export type DropdownProps = {
  active: boolean;
  content: Account[];
  loading: boolean;
  error: string | Error;
  hiddenAddressGap?: HiddenAddressGap;
  onChange?: (value: string) => void;
  onClickOutside?: () => void;
}

export type Theme = "light" | "dark"

type HiddenAddressGap = {
  indexA: number;
  indexB: number;
}

export interface RedefinedDomainResolverProps {
  theme: Theme;
  width?: string;
  height?: string;
  autoFocus?: boolean
  disabled?: boolean
  hiddenAddressGap?: HiddenAddressGap

  onSelect(address: string): void;
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
}

export interface ITheme {
  colors: {
    background: string
    primary: string
    secondary: string
    error: string,
    brandColor: string,
    disabled: string
  }
}