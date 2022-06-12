import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const BaseWrapper: React.FC<Props> = ({children}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('pt-8 px-6 mx-auto')}>
      {children}
    </View>
  )
}

type Props = { 
  children: React.ReactNode
}

export default BaseWrapper