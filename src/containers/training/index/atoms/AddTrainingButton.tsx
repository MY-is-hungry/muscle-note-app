import { Text } from "react-native"
import { Button } from "react-native-paper"
import { useTailwind } from "tailwind-rn/dist"

const AddTrainingButton: React.FC<Props> = ({onPressFn}) => {
  const tailwind = useTailwind()

  return (
    <Button
      mode='contained'
      onPress={onPressFn}
      contentStyle={tailwind('w-full h-full')}
      labelStyle={tailwind('text-base')}
      style={tailwind('w-64 h-16 mx-auto mt-6 bg-primary rounded-lg')}
    >
      <Text>トレーニングを追加</Text>
    </Button>
  )
}

type Props = {
  onPressFn: () => void
}

export default AddTrainingButton