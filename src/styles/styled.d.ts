import 'styled-components';
import {Theme, ITheme} from "../types";

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {
    type: Theme
  }
}