import { ExerciseWithRecordType } from "@common/types"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import RecordContainer from "../molecules/RecordContainer"

const RecordArea: React.FC<Props> = ({exercises}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1')}>
      { exercises?.map ((exercise) => {
        return <RecordContainer key={exercise.id} exercise={exercise}/>
      })}
    </View>
  )
}

type Props = {
  exercises: ExerciseWithRecordType[]
}

export default RecordArea