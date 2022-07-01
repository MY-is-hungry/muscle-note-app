import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"


const SelectEventModal: React.FC = () => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 justify-center items-center bg-white')}>
      <Text>aaaaaaaaaaaa</Text>
    </View>
  )
}
export default SelectEventModal