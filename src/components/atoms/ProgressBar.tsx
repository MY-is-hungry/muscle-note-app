import { SECONDARY_COLOR } from "@common/styles/themes"
import { ProgressType } from "@common/types"
import { ColorValue, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const ProgressBar: React.FC<Props> = ({progress}) => {
  const tailwind = useTailwind()
  const currentBarStyles = {
    maxWidth: '100%',
    minWidth: 10,
    width: `${Math.round(progress.current / progress.goal * 100)}%`,
    height: 12,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 6
  }

  return (
    <View style={tailwind('relative w-full h-3 bg-light-gray rounded-md')}>
      <View style={currentBarStyles}/>
    </View>
  )
}

type Props = {
  progress: ProgressType
}

type VisibleBarType = {
  overflow: 'hidden',
  width: number | string
  height: number | string
  backgroundColor?: ColorValue | undefined;
}

export default ProgressBar