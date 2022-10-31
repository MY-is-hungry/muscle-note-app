import { initialIsOpenEventDrawer } from "@common/recoil/atoms"
import { NAVY_BLUE, TRANSP_BLACK } from "@common/styles/themes"
import { DrawerState } from "@common/types/drawer"
import DrawerTopBar from "@components/atoms/DrawerTopBar"
import BaseWrapper from "@components/layout/BaseWrapper"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import { useEffect, useRef } from "react"
import { Animated, Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState, Text, useWindowDimensions, View } from "react-native"
import { useRecoilState } from "recoil"
import { useTailwind } from "tailwind-rn/dist"
import CategoryList from "../molecules/CategoryList"
import EventList from "../organisms/EventList"


const SelectEventDrawer: React.FC<Props> = ({navigation}) => {
  const tailwind = useTailwind()
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
  const onPanResponderMove = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState,
  ) => {
    const val = movementValue(moveY)
    animateMove(y, val)
  }

  // 放した時のイベント
  const onPanResponderRelease = (
    _: GestureResponderEvent,
    { moveY }: PanResponderGestureState,
  ) => {
    const valueToMove = movementValue(moveY)
    // TODO: Typeerror解消 _valueが未定義
    // @ts-ignore
    const nextState = getNextState(state._value, valueToMove, margin)
    state.setValue(nextState)
    nextState === DrawerState.Closed && setIsOpenEventDrawer(false)
    animateMove(y, nextState)
  }

  // レスポンダーに何かさせるか判定 今だと、10以上 -10以下
  // const onMoveShouldSetPanResponder = (
  //   _: GestureResponderEvent,
  //   { dy }: PanResponderGestureState,
  // ) => Math.abs(dy) >= 10

  // イベントハンドラーを割り当て
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current

  const animateMove = (y: Animated.Value, toValue: number | Animated.Value, callback?: any) => {
    Animated.spring(y, {
      toValue: -toValue,
      tension: 20,
      useNativeDriver: false,
    }).start((finished) => {
      finished && callback && callback()
    })
  }

  const getNextState = (
    currentState: DrawerState,
    val: number,
    margin: number,
  ): DrawerState => {
    switch (currentState) {
      case DrawerState.Open:
        return val >= currentState
          ? DrawerState.Open
          : DrawerState.Closed
      case DrawerState.Closed:
        return val >= currentState + margin
          ? DrawerState.Open
          : DrawerState.Closed
      default:
        return currentState
    }
  }

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
      <DrawerTopBar/>
      <ScrollWrapper>
        <CategoryList/>
        <EventList navigation={navigation}/>
      </ScrollWrapper>
    </Animated.View>
  )
}

type Props = {
  navigation: any
}

export default SelectEventDrawer