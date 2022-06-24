import BaseBox from "@components/molecules/BaseBox"
import BaseLabel from "@components/atoms/BaseLabel"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const HomeResultArea: React.FC<Props> = ({totalDate, totalVolume}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mt-6')}>
      <Text style={tailwind('ml-4 text-white text-xl')}>今月の実績</Text>
      <View style={tailwind('flex flex-row justify-between')}>
        <BaseBox name='合計日数' value={`${totalDate}日`} />
        <BaseBox name='合計重量' value={{ goal: 1000, current: totalVolume || 0, unit: 't' }} />
      </View>
    </View>
  )
}

type Props = {
  totalDate?: number
  totalVolume?: number
}

export default HomeResultArea