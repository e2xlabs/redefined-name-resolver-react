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
    borderColor: "#6F6F6F"
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
    fontFamily: "Poppins, sans-serif",
    fontSize: "16px",
    color: baseTheme.colors.primary,
    height: "55px",
    borderRadius: "15px",
    borderColor: baseTheme.colors.primary,
    borderWidth: "1px",
    logo: {
      padding: "12px",
      width: "37px",
    },
    timeout: {
      fontSize: "11px",
    }
  },

  dropDown: {
    logo: {
      width: "25px",
      height: "25px",
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
