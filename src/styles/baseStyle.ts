import {ITheme} from "../types";
import {DefaultTheme} from "styled-components";

export const baseTheme: ITheme = {
  colors: {
    background: "#FFFFFF",
    error: "#cc0033",
    primary: "#222222",
    secondary: "#FFCCCC",
    brandColor: "#faab1e",
    disabled: "#ebebe4",
    hover: "whitesmoke"
  }
}

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: "light",

  colors: {
    ...baseTheme.colors,
  },
}

export const darkTheme: DefaultTheme = {
  type: "dark",

  colors: {
    ...baseTheme.colors,
    background: "#222222",
    primary: "#FFCCCC",
    secondary: "#222222",
    disabled: "#9a9a9a",
    hover: "black"
  },
}

export const baseStyle = {
  width: '40%',
  brandColor: baseTheme.colors.brandColor,

  error: {
    color: baseTheme.colors.error,
    fontSize: "14px",
  },

  input: {
    fontFamily: "Poppins, serif",
    fontSize: "16px",
    color: baseTheme.colors.primary,
    height: "40px",
    borderRadius: "8px",
    borderColor: baseTheme.colors.primary,
    borderWidth: "1px",
    logo: {
      padding: "5px"
    }
  },

  dropDown: {
    logo: {
      width: "20px",
    },
    copyIcon: {
      width: "20px"
    }
  },

  loader: {
    height: 20,
    width: 20,
  }
}