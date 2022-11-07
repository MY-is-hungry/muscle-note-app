import { Button } from "react-native-paper"

const NavigationButton: React.FC<Props> = ({text, navigation}) => {
  return (
    <Button>
      {text}
    </Button>
  )
}
export default NavigationButton

// TODO: navigationの型定義
type Props = {
  text: string
  navigation: any
}