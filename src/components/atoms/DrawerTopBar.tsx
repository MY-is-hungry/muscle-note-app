import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const DrawerTopBar = () => {
  const tailwind = useTailwind()
  return <View style={tailwind('mx-auto mt-3 mb-4 h-1 w-16 bg-light-gray rounded-3xl')}/>
}
export default DrawerTopBar