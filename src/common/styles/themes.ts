import { DefaultTheme } from "react-native-paper"

export const PRIMARY_COLOR = '#EF454A'
export const DISABLED_COLOR = '#808080'
export const CLEAR_WHITE_COLOR = '#FFFFFF'

export const customPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
  },
}