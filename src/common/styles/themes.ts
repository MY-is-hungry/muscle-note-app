import { DefaultTheme as PaperTheme } from "react-native-paper"
import { DefaultTheme as NavTheme } from '@react-navigation/native';
import { Theme } from "react-native-paper/lib/typescript/types";

export const PRIMARY_COLOR = '#4456B7'
export const SECONDARY_COLOR = '#CCF74A'
export const DISABLED_COLOR = 'rgba(255, 255, 255, 0.3)'
export const CLEAR_WHITE_COLOR = '#FFFFFF'
export const CLEAR_COLOR = 'transparent'
const BLACK = '#000000'

export const BACKGROUND_COLOR = 'rgba(88, 88, 88, 0.9)'

type PaperThemes = {
  colors: {
    'transp-gray': string
  }
}

// ReactNativePaperカラー設定
export const customPaperTheme: Theme & PaperThemes = {
  ...PaperTheme,
  colors: {
    ...PaperTheme.colors,
    primary: PRIMARY_COLOR,
    background: BLACK,
    accent: CLEAR_WHITE_COLOR,
    'transp-gray': 'rgba(88, 88, 88, 0.9)',
  },
}

// ReactNavigationカラー設定
export const customNavTheme = {
  ...NavTheme,
  colors: {
    ...NavTheme.colors,
    background: 'transparent',
  },
};