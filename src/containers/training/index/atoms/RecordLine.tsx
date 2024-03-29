import { RecordType } from "@common/types"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const RecordLine: React.FC<Props> = ({record, number}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('mb-2 text-white')}>
      <View style={tailwind('flex flex-row')}>
        <Text style={tailwind('min-w-6 text-white text-lg')}>{number}.</Text>
        <Text style={tailwind('text-white text-lg')}>  {record?.weight}kg</Text>
        <Text style={tailwind('text-white text-xl')}>  ×  </Text>
        <Text style={tailwind('text-white text-lg')}>{record?.rep}reps</Text>
      </View>
    </View>
  )
}

type Props = {
  record?: RecordType
  number: number
}

export default RecordLine