import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Button } from "react-native-paper"
import { useRecoilState } from "recoil"
import { initialIsOpenEventDrawer } from "@common/recoil/atoms"

const StartTrainingButton: React.FC = () => {
  const tailwind = useTailwind()
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useRecoilState(initialIsOpenEventDrawer)

  return (
    <Button
      mode='contained'
      onPress={() => setIsOpenEventDrawer(!isOpenEventDrawer)}
      contentStyle={tailwind('w-full h-full')}
      labelStyle={tailwind('text-base')}
      style={tailwind('w-64 h-16 mx-auto mt-4 bg-primary rounded-lg')}
    >
      <Text>トレーニングを開始</Text>
    </Button>
  )
}

export default StartTrainingButton