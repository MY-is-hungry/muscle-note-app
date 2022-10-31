import { initialIsOpenEventDrawer } from "@common/recoil/atoms"
import { NAVY_BLUE, TRANSP_BLACK } from "@common/styles/themes"
import { animateMove, DrawerState, getNextState } from "@common/utils/drawer"
import DrawerHorizontalLine from "@components/atoms/DrawerHorizontalLine"
import { useEffect, useRef } from "react"
import { Animated, Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState } from "react-native"
import { useRecoilState } from "recoil"

const SelectEventDrawer: React.FC<Props> = ({children, onDrawerStateChange}) => {
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useRecoilState(initialIsOpenEventDrawer)

  // TODO: 横画面になった際に不具合があるので対処 https://zenn.dev/tasugi/articles/0814f06b514eed
  const { height } = Dimensions.get('window')
  // const { height } = useWindowDimensions()
  const y = useRef<Animated.Value>(new Animated.Value(DrawerState.Closed)).current
  // タブ追跡用
  const state = useRef<Animated.Value>(new Animated.Value(DrawerState.Closed)).current
  const margin = 0.05 * height
  const movementValue = (moveY: number) => height - moveY

  useEffect (() => {
    if(isOpenEventDrawer) {
      state.setValue(DrawerState.Open)
      animateMove(y, DrawerState.Open)
    }
  }, [isOpenEventDrawer])

  // 操作中のイベント
  const onPanResponderMove = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const val = movementValue(moveY)
    animateMove(y, val)
  }

  // 放した時のイベント
  const onPanResponderRelease = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const valueToMove = movementValue(moveY)
    // TODO: Typeerror解消 _valueが未定義
    // @ts-ignore
    const nextState = getNextState(state._value, valueToMove, margin)
    state.setValue(nextState)
    nextState === DrawerState.Closed && setIsOpenEventDrawer(false)
    animateMove(y, nextState, onDrawerStateChange(nextState))
  }

  // レスポンダーに何かさせるか判定 今だと、10以上 -10以下
  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    { dy }: PanResponderGestureState,
  ) => Math.abs(dy) >= 10

  // イベントハンドラーを割り当て
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current

  return (
    <Animated.View
      style={[
        {
          zIndex: 9999,
          width: '100%',
          // 画面外まで引っ張れてしまうため、画面より少し高めに設定
          height: height+200,
          backgroundColor: TRANSP_BLACK,
          borderRadius: 25,
          position: 'absolute',
          bottom: -height-200,
          transform: [{ translateY: y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <DrawerHorizontalLine/>
      {children}
    </Animated.View>
  )
}

type Props = {
  onDrawerStateChange: (nextState: DrawerState) => void;
}

export default SelectEventDrawer