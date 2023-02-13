import {ITheme} from "../types";
import {css, DefaultTheme} from "styled-components";

export const baseTheme: ITheme = {
  colors: {
    background: "#FFFFFF",
    error: "#cc0033",
    primary: "#222222",
    secondary: "#FFCCCC",
    brandColor: "#faab1e",
    disabled: "#ebebe4",
    hover: "whitesmoke",
    borderColor: "rgb(5%, 5%, 5%)"
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
    primary: "#d4d3d3",
    secondary: "#222222",
    disabled: "#9a9a9a",
    hover: "#313131",
    borderColor: "rgb(95%, 95%, 95%)"
  },
}

export const baseStyle = {
  width: '40%',
  brandColor: baseTheme.colors.brandColor,
  brandTextColor: css`
    background: linear-gradient(-90deg, #FF8254, #FFBD80, #FFE870);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `,

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