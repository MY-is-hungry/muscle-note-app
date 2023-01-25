import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const SimpleText: React.FC<Props> = ({text, size, color}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('h-10')}>
      <Text style={
        tailwind(`${size?`text-${size}`:''} ${color?`text-${color}`:''}`)
      }>
        {text}
      </Text>
    </View>
  )
}

type Props = {
  text: string
  size?: string
  color?: string
}

export default SimpleText