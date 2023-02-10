import {Account} from "redefined-resolver";

export type DropdownProps = {
  active: boolean;
  content: Account[];
  loading: boolean;
  error: string | Error;
  onChange?: (value: string) => void;
  onClickOutside?: () => void;
}

export interface RedefinedDomainResolverProps {
  width?: string;
  height?: string;
  theme?: "light" | "dark";

  onSelect(address: string): void;
}

export interface ContainerProps {
  width?: string;
}

export interface InputProps {
  height?: string;
}