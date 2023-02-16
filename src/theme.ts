import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const base = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: { width: '100%' },
      ':root': { width: '100%' },
      body: {
        width: '100%',
        height: '100#',
        backgroundColor: 'gray.800',
        fontSize: '16px',
        fontWeight: 400,
        fontSynthesis: 'none',
        textRendering: 'optimizeLegibility',
      },
    }
  }
}

const theme = extendTheme(base);

export default theme;
