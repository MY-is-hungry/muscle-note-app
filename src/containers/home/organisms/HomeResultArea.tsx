import BaseLabel from "@components/atoms/BaseLabel"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const HomeResultArea: React.FC = () => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mt-6')}>
      <Text style={tailwind('ml-4 text-white text-xl')}>今月の実績</Text>
      <BaseLabel title='合計日数' value='1,000日' />
      <BaseLabel title='合計重量' value='1,000t' />
    </View>
  )
}
export default HomeResultArea