import { View } from "react-native"

const EventLabel: React.FC<Props> = ({name, onPressFn}) => {
  return (
    <View>
    </View>
  )
}

type Props = {
  name: string
  onPressFn: (eventName: string) => void
}

export default EventLabel