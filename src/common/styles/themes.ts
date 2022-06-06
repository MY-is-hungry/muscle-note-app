import { DefaultTheme as PaperTheme } from "react-native-paper"
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export const PRIMARY_COLOR = '#4456B7'
export const DISABLED_COLOR = '#808080'
export const CLEAR_WHITE_COLOR = '#FFFFFF'
const BLACK = '#000000'


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