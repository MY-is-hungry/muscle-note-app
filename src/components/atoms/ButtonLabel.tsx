import { Text } from "react-native"
import { Button } from "react-native-paper"
import { useTailwind } from "tailwind-rn/dist"

const ButtonLabel: React.FC<Props> = ({name, value, onPressFn, isArrow}) => {
  const tailwind = useTailwind()

  return (
    <Button
      mode='contained'
      onPress={onPressFn}
      contentStyle={tailwind('w-full h-full')}
      labelStyle={tailwind('px-3 mr-auto rounded-2xl')}
      // TODO: flex flex-row justify-between items-center  mx-10 一旦消した valueある場合に対応させる時にデザイン調整
      style={tailwind('w-80 h-14 my-2 rounded-2xl bg-transp-gray overflow-hidden')}
    >
      <Text style={tailwind('text-white text-base font-normal')}>{name}</Text>
      {/* <Text style={tailwind('text-white text-base font-normal')}>{value}</Text> */}
    </Button>
  )
}

type Props = { 
  name: string
  value?: string
  onPressFn: (e?: any) => any | void
  isArrow?: boolean
}

export default ButtonLabel