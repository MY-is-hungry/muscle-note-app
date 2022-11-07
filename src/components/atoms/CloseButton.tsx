import { NAVY_BLUE } from "@common/styles/themes"
import { Text } from "react-native"
import { Button, IconButton } from "react-native-paper"
import { useTailwind } from "tailwind-rn/dist"

const CloseButton: React.FC<Props> = ({onPressFn}) => {
  const tailwind = useTailwind()

  return (
    <IconButton
      icon='close'
      color={'white'}
      onPress={onPressFn}
      animated={true}
      size={40}
      style={{...tailwind('absolute bottom-8 right-8 bg-primary'), ...{zIndex: 5050}}}
    />
  )
}

type Props = {
  onPressFn: () => void
}

export default CloseButton