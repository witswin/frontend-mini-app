import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { Button } from './components/button';
import { Tag } from './components/tag';
import { Badge } from './components/badge';
import { fontSizes } from './fontsize';
import { Input } from './components/input';

export const baseTheme = extendTheme({
  colors,
  fontSizes,
  components: {
    Button,
    Tag,
    Badge,
    Input,
  },
  styles: {
    global: {
      '*::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        borderRadius: '14px',
        background: 'glassBackground',
        '&:hover': {
          background: 'rgba(217,217,217,0.5)',
        },
        'button, a, input, textarea': {
          outline: 'none',
          '-webkit-tap-highlight-color': 'transparent',
        },
        'button:focus, a:focus, input:focus, textarea:focus': {
          outline: 'none',
        },
      },
      body: {
        minH: '100vh',
        width: '100%',
        background: 'gray.800',
        color: 'gray.0',
        fontFamily: 'Montserrat',
        position: 'relative',
        // pb: "106px",
        overflowX: 'hidden',
      },
      html: {
        height: '100%',
        overflowX: 'hidden',
      },
    },
  },
});
