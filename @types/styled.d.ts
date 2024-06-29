import 'styled-components';
import { MainTheme } from '../src/styles/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends MainTheme { }
}
