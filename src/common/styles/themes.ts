import { DefaultTheme as PaperTheme } from "react-native-paper"
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export const PRIMARY_COLOR = '#4456B7'
export const DISABLED_COLOR = 'rgba(255, 255, 255, 0.3)'
export const CLEAR_WHITE_COLOR = '#FFFFFF'
export const CLEAR_COLOR = 'transparent'
const BLACK = '#000000'

export const BACKGROUND_COLOR = 'rgba(88, 88, 88, 0.9)'


// ReactNativePaperカラー設定
export const customPaperTheme = {
  ...PaperTheme,
  colors: {
    ...PaperTheme.colors,
    primary: PRIMARY_COLOR,
    background: BLACK,
    accent: CLEAR_WHITE_COLOR,
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