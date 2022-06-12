import { ProgressType } from "@common/types"
import { getFulfillment } from "@common/utils/boolean"
import NumericalProgress from "@components/atoms/NumericalProgress"
import ProgressBar from "@components/atoms/ProgressBar"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const BaseBox: React.FC<Props> = ({name, value}) => {
  const tailwind = useTailwind()
  // 目標付きであれば、達成状況を確認
  const isAchieved = typeof(value) === 'string' ? false : getFulfillment(value.goal, value.current)

  return (
    <View style={tailwind('flex w-38 h-30 py-4 px-4 my-2 rounded-2xl bg-transp-gray')}>
      <Text style={tailwind('text-white text-lg')}>{name}</Text>
      { typeof value === 'string' ?
        <View style={tailwind('flex w-full h-full justify-center items-end')}>
          <Text style={tailwind('text-white text-2xl')}>{value}</Text>
        </View>
        :
        <View style={tailwind('flex w-full h-14 justify-around items-end')}>
          <NumericalProgress progress={value}/>
          <ProgressBar progress={value} />
        </View>
      }
    </View>
  )
}

type Props = { 
  name: string
  value: string | ProgressType & { unit: string }
}

export default BaseBox