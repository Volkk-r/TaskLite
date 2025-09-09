import "@emotion/react";
import { theme } from "./theme";

type AppTheme = typeof theme;

declare module "@emotion/react" {
    // расширяем Theme глобально
    export interface Theme extends AppTheme {}
}
