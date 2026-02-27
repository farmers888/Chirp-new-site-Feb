'use client';

import { ReactNode } from 'react';

import { CodeLanguageProvider } from './code-language-context';
import { ThemeProvider } from './theme-context';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* <slot:theme-provider-wrapper> */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {/* <slot:cookie-banner-provider-wrapper> */}
        <CodeLanguageProvider>{children}</CodeLanguageProvider>
        {/* </slot:cookie-banner-provider-wrapper> */}
      </ThemeProvider>
      {/* </slot:theme-provider-wrapper> */}
    </>
  );
}
