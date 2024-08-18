"use client";
import * as React from "react";
import NextAppDirEmotionCacheProvider from "./theme/modules/EmotionCache";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "istore" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
