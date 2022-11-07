import { Text } from "react-native"
import { Button } from "react-native-paper"
import { useTailwind } from "tailwind-rn/dist"


const SelectLabel: React.FC<Props> = ({name, onPressFn, isSelected}) => {
  const tailwind = useTailwind()

  return (
    <Button
      mode='contained'
      onPress={onPressFn}
      contentStyle={tailwind('w-full h-full')}
      labelStyle={tailwind('px-3 mr-auto rounded-2xl')}
      style={tailwind(`w-80 h-14 my-2 rounded-2xl overflow-hidden ${isSelected ? 'bg-selected' : 'bg-transp-gray'}`)}
    >
      <Text style={tailwind('text-white text-base font-normal')}>{name}</Text>
    </Button>
  )
}

type Props = { 
  name: string
  onPressFn: () => void
  isSelected: boolean
}

export default SelectLabel