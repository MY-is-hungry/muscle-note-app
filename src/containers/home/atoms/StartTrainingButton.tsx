import { initialIsOpenExerciseDrawer } from "@common/recoil/atoms"
import { Text } from "react-native"
import { Button } from "react-native-paper"
import { useRecoilState } from "recoil"
import { useTailwind } from "tailwind-rn/dist"

const StartTrainingButton: React.FC = () => {
  const tailwind = useTailwind()
  const [isOpenExerciseDrawer, setIsOpenExerciseDrawer] = useRecoilState(initialIsOpenExerciseDrawer)

  return (
    <Button
      mode='contained'
      onPress={() => setIsOpenExerciseDrawer(!isOpenExerciseDrawer)}
      contentStyle={tailwind('w-full h-full')}
      labelStyle={tailwind('text-base')}
      style={tailwind('w-64 h-16 mx-auto mt-6 bg-primary rounded-lg')}
    >
      <Text>トレーニングを開始</Text>
    </Button>
  )
}

export default StartTrainingButton