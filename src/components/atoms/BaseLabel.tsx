import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const BaseLabel: React.FC<Props> = ({name, value}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex flex-row justify-between items-center w-80 h-14 px-6 my-2 rounded-2xl bg-transp-gray')}>
      <Text style={tailwind('text-white text-lg')}>{name}</Text>
      <Text style={tailwind('text-white text-lg')}>{value}</Text>
    </View>
  )
}

type Props = {
  name: string
  value: string
}

export default BaseLabel