import { SafeAreaView, ScrollView } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

const ScrollWrapper: React.FC<Props> = ({children, scrollEnabled, onScrollFn}) => {
  const tailwind = useTailwind()
  const scroll = scrollEnabled ?? true

  return (
    <ScrollView
      contentContainerStyle={tailwind('flex-grow pt-8 pb-30 px-6 mx-auto')}
      scrollEnabled={scroll}
      // onScroll={onScroll}
    >
      {children}
    </ScrollView>
  )
}

type Props = {
  children: React.ReactNode
  scrollEnabled?: boolean
  onScrollFn?: () => void;
}

export default ScrollWrapper