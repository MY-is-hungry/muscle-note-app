import { initialDrawerScroll } from "@common/recoil/atoms"
import { useRef } from "react"
import { PanResponder, View } from "react-native"
import { useRecoilState } from "recoil"
import { useTailwind } from "tailwind-rn/dist"

const DrawerHorizontalLineArea = () => {
  const tailwind = useTailwind()
  // const [scroll, setScroll] = useRecoilState<boolean>(initialDrawerScroll)

  // const onDrag = (e:any) => {
  //   // e.stopPropagation()
  //   setScroll(false)
  //   console.log('onDrag!')
  //   return false
  // }

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponderCapture: onDrag,
  //   }),
  // ).current

  return (
    <View style={tailwind('w-full pt-3 pb-8')}>
      <View style={tailwind('inline h-1 w-20 mx-auto bg-light-gray rounded-3xl')}/>
    </View>
  )
}
export default DrawerHorizontalLineArea