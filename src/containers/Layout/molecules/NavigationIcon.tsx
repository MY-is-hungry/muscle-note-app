import { Text, View } from "react-native"
import { CLEAR_WHITE_COLOR, PRIMARY_COLOR } from "@common/styles/themes";
import { useTailwind } from "tailwind-rn/dist";
import TabIcon from "../atoms/TabIcon";

const NavigationIcon: React.FC<Props> = ({route, isFocused}) => {
  const tailwind = useTailwind()
  const color = isFocused ? PRIMARY_COLOR : CLEAR_WHITE_COLOR

  return (
    <View style={tailwind('flex justify-between items-center')}>
      <TabIcon route={route} color={color}/>
      <Text style={tailwind(`mt-1 text-white text-3xs ${isFocused ? 'text-primary' : 'text-white' }`)}>
        {route}
      </Text>
    </View>
  )
}

type Props = {
  route: string
  isFocused: boolean
}



export default NavigationIcon