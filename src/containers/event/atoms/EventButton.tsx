import { Text, TouchableOpacity, View } from "react-native"
import { Button } from "react-native-paper"
import { useTailwind } from "tailwind-rn/dist"

const EventButton: React.FC<Props> = ({name, isSelected, onPressFn}) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity 
      onPress={() => onPressFn(name)}
      style={tailwind(`flex justify-center items-center min-w-14 h-6 ml-3 mb-3 border border-solid border-white rounded-md ${isSelected ? 'bg-white' : ''}`)}
    >
      <Text style={tailwind(`${isSelected ? '' : 'text-white'}`)}>
        {name}
      </Text>
    </TouchableOpacity>
  )
}

type Props = {
  name: string
  isSelected: boolean
  onPressFn: (eventName: string) => void
}

export default EventButton