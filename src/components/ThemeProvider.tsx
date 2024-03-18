'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider: typeof NextThemesProvider = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
