import { initialIsOpenEventDrawer } from "@common/recoil/atoms"
import { NAVY_BLUE, TRANSP_BLACK } from "@common/styles/themes"
import { animateMove, DrawerState, getNextState } from "@common/utils/drawer"
import DrawerHorizontalLineArea from "@components/atoms/DrawerHorizontalLineArea"
import { useEffect, useRef } from "react"
import { Animated, Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState } from "react-native"
import { useRecoilState } from "recoil"

const SelectEventDrawer: React.FC<Props> = ({children, onDrawerStateChange}) => {
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useRecoilState(initialIsOpenEventDrawer)

  // TODO: 横画面になった際に不具合があるので対処 https://zenn.dev/tasugi/articles/0814f06b514eed
  const { height } = Dimensions.get('window')
  const y = useRef<Animated.Value>(new Animated.Value(DrawerState.Closed)).current
  const state = useRef<Animated.Value>(new Animated.Value(DrawerState.Closed)).current
  // const margin = 0.05 * height
  // const movementValue = (moveY: number) => height - moveY

  useEffect (() => {
    if(isOpenEventDrawer) {
      state.setValue(DrawerState.Open)
      animateMove(y, DrawerState.Open)
    }
  }, [isOpenEventDrawer])

  // // 操作中のイベント
  // const onPanResponderMove = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
  //   console.log('onPanResponderMove')
  //   const val = movementValue(moveY)
  //   animateMove(y, val)
  // }

  // // 放した時のイベント(ジェスチャー成功)
  // const onPanResponderRelease = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
  //   console.log('onPanResponderRelease')

  //   const valueToMove = movementValue(moveY)
  //   // TODO: Typeerror解消 _valueが未定義
  //   // @ts-ignore
  //   const nextState = getNextState(state._value, valueToMove, margin)
  //   state.setValue(nextState)
  //   // console.log('nextState', nextState)
  //   // console.log('関数ないどろわー', isOpenEventDrawer)
  //   if(nextState === DrawerState.Closed) setIsOpenEventDrawer(false)
  //   // setScroll(true)
  //   animateMove(y, nextState, onDrawerStateChange(nextState))
  // }

  // // レスポンダーに何かさせるか判定
  // const onStartShouldSetPanResponderCapture = (_: GestureResponderEvent, { dy }: PanResponderGestureState) => {
  //   console.log('onStartShouldSetPanResponderCapture')
  //   console.log('start', scroll)
  //   return false
  //   // console.log('dy', dy)
  //   // console.log('bool', Math.abs(dy) >= 10)
  //   console.log('start_scroll', scroll)
  //   if (scroll) return false
  //   return Math.abs(dy) >= 10
  // }

  // const onMoveShouldSetPanResponderCapture = (_: GestureResponderEvent,{ dy }: PanResponderGestureState) => {
  //   console.log('onMoveShouldSetPanResponderCapture')
  //   console.log('move', scroll)
  //   if (scroll) return false
  //   return true
  // }
  // const onPanResponderGrant = (_: GestureResponderEvent,{ dy }: PanResponderGestureState) => {
  //   console.log('onPanResponderGrant')
  // }

  // const panResponder = useRef(
  //   PanResponder.create({
  //     // イベント発生順
  //     onStartShouldSetPanResponderCapture,
  //     onMoveShouldSetPanResponderCapture,
  //     onPanResponderGrant,
  //     onPanResponderMove,
  //     onPanResponderRelease,
  //   }),
  // ).current

  return (
    <Animated.View
      style={[
        {
          zIndex: 5000,
          width: '100%',
          // 画面外まで引っ張れてしまうため、画面より少し高めに設定
          height: height+280,
          paddingTop: 10,
          paddingBottom: 400,
          position: 'absolute',
          bottom: -height-300,
          transform: [{ translateY: y }],
          backgroundColor: TRANSP_BLACK,
          borderRadius: 25,
        },
      ]}
      // {...panResponder.panHandlers}
    >
      {/* <DrawerHorizontalLineArea/> */}
      {children}
    </Animated.View>
  )
}

type Props = {
  onDrawerStateChange: (nextState: DrawerState) => void;
}

export default SelectEventDrawer