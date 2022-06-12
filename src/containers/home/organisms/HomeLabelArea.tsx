import BaseLabel from "@components/atoms/BaseLabel"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const HomeLabelArea: React.FC = () => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mt-6')}>
      <BaseLabel name='合計日数' value='1,000日' />
      <BaseLabel name='合計重量' value='1,000t' />
    </View>
  )
}
export default HomeLabelArea