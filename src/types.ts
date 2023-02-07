import {HTMLProps, ClipboardEvent} from "react";

export type InputFieldChangeEvent = {
  index: number;
  value: string;
}

export type DropdownProps = {
  active: boolean;
  content: any[];
  onChange: (value: any) => void;
}

export interface InputFieldProps {
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;

  autoFocus?: boolean;
  index?: number;
  value?: HTMLProps<HTMLInputElement>["value"];
  error?: string | Error;
  label?: string;

  onChange?(event: InputFieldChangeEvent): void;

  onCopy?(event: ClipboardEvent): void;
}