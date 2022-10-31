import ButtonLabel from "@components/atoms/ButtonLabel"
import { View } from "react-native"
import EventLabelButton from "../atoms/EventButton"

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