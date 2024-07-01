import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { theme } from "@/styles/theme";
import { AuthContextProvider } from "@/context/AuthContext";
import StyledComponentsRegistry from "../../lib/registry";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <Component {...pageProps} />
                </AuthContextProvider>
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
}
