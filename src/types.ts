import {Account} from "redefined-resolver";

export type DropdownProps = {
  active: boolean;
  content: Account[];
  loading: boolean;
  error: string | Error;
  onChange?: (value: string) => void;
  onClickOutside?: () => void;
}

export type Theme = "light" | "dark"

export interface RedefinedDomainResolverProps {
  width?: string;
  height?: string;
  theme: Theme;

  onSelect(address: string): void;
}

export interface ContainerProps {
  width?: string;
}

export interface InputProps {
  height?: string;
}

export interface ITheme {
  colors: {
    background: string
    primary: string
    secondary: string
    error: string,
    brandColor: string
  }
}