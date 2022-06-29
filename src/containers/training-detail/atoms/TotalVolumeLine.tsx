import { TrainingSetType } from "@common/types"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const TotalVolumeLine: React.FC<Props> = ({volume}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mt-2')}>
      <View style={tailwind('flex flex-row')}>
        <Text style={tailwind('text-white text-lg')}>Volume: </Text>
        <Text style={tailwind('text-secondary text-lg')}>{volume?.toLocaleString()}</Text>
      </View>
    </View>
  )
}

type Props = {
  volume?: number
}

export default TotalVolumeLine