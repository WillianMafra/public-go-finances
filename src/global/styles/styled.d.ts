import theme from '@/src/global/styles/theme';

type ThemeType = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
