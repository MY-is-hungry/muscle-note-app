import { SECONDARY_COLOR } from "@common/styles/themes"
import { ProgressType } from "@common/types"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const ProgressBar: React.FC<Props> = ({progress}) => {
  const tailwind = useTailwind()
  const currentBarStyles = {
    width: `${Math.round(progress.current / progress.goal * 100)}%`,
    height: 12,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 12
  }

  return (
    <View style={tailwind('relative w-full h-3 bg-light-gray rounded-3xl')}>
      <View style={currentBarStyles}/>
    </View>
  )
}

type Props = {
  progress: ProgressType
}

export default ProgressBar