import {createGlobalStyle} from "styled-components";
import {baseStyle} from "./baseStyle";

const GlobalStyle = createGlobalStyle`
  * {
    ::-webkit-scrollbar-track {
      --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
    }

    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      --webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
      background-color: ${baseStyle.brandColor};
    }
  }
  
  body {
    font-family: "Poppins",serif;
  }
`

export default GlobalStyle;
