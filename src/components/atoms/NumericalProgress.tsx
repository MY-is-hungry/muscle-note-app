import { ProgressType } from "@common/types"
import { Text } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const NumericalProgress: React.FC<Props> = ({progress}) => {
  const tailwind = useTailwind()

  return (
    <Text style={tailwind('text-white text-lg')}>
      <Text style={tailwind('text-2xl')}>{progress.current}</Text>
      <Text>／</Text>
      <Text style={tailwind('text-base')}>{progress.goal}</Text>
      <Text>{progress.unit}</Text>
    </Text>
  )
}

type Props = {
  progress: ProgressType & { unit: string }
}

export default NumericalProgress