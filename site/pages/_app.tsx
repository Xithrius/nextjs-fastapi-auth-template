import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "@/lib/fetchJson";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
