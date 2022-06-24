import { MonthlyRecordType } from "@common/types"
import BaseLabel from "@components/atoms/BaseLabel"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const HomeLabelArea: React.FC<Props> = ({totalDate, totalVolume}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mt-6')}>
      <BaseLabel name='合計日数' value={`${totalDate}日`} />
      <BaseLabel name='合計重量' value={`${totalVolume?.toLocaleString()}kg`} />
    </View>
  )
}

type Props = {
  totalDate?: number
  totalVolume?: number
}

export default HomeLabelArea