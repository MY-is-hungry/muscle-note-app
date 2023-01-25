import { View } from "react-native"

const ExerciseLabel: React.FC<Props> = ({name, onPressFn}) => {
  return (
    <View>
    </View>
  )
}

type Props = {
  name: string
  onPressFn: (exerciseName: string) => void
}

export default ExerciseLabel