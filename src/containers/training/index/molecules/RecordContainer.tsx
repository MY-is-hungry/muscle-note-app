import { ExerciseWithRecordType } from "@common/types"
import { getTotalVolume } from "@common/utils/number"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import RecordLine from "../atoms/RecordLine"
import TotalVolumeLine from "../atoms/TotalVolumeLine"

const RecordContainer: React.FC<Props> = ({exercise}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('w-80 p-6 mb-8 rounded-3xl bg-transp-gray')}>
      <Text style={tailwind('mb-2 text-white text-lg')}>{exercise.name}</Text>
      { exercise.records.map ((record, i) => {
        return <RecordLine key={`record${record.id}`} record={record} number={i+1}/>
      })}
      <TotalVolumeLine volume={getTotalVolume(exercise.records || [])}/>
    </View>
  )
}

type Props = {
  exercise: ExerciseWithRecordType
}

export default RecordContainer