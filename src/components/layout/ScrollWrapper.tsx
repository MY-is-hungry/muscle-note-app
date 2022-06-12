import { SafeAreaView, ScrollView } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const ScrollWrapper: React.FC<Props> = ({children}) => { 
  const tailwind = useTailwind()

  return (
    <ScrollView style={tailwind('pt-8 pb-20 px-6 mx-auto')}>
      {children}
    </ScrollView>
  )
}

type Props = { 
  children: React.ReactNode
}

export default ScrollWrapper