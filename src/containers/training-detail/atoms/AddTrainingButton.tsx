import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const AddTrainingButton: React.FC<Props> = ({onPressFn}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex justify-center items-center w-60 h-14 mx-auto mt-4 bg-primary rounded-lg')}>
      <Text style={tailwind('text-white text-base')}>トレーニングを追加</Text>
    </View>
  )
}

type Props = {
  onPressFn: () => void
}

export default AddTrainingButton