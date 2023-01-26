import ScrollWrapper from "@components/layout/ScrollWrapper"
import { Text } from "react-native"

const TrainingNew: React.FC<Props> = ({navigation, route}) => { 

  return (
    <ScrollWrapper>
      <Text>ここが登録ページだぞ！！！！！！</Text>
    </ScrollWrapper>
  )
}

type Props = {
  navigation: any
  route: any
}

export default TrainingNew