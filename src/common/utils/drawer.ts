import { Animated, Dimensions } from "react-native"


// TODO: 横画面になった際に不具合があるので対処 https://zenn.dev/tasugi/articles/0814f06b514eed
const { height } = Dimensions.get('window');

export enum DrawerState {
  Open = height - 100,
  // Peek = 230,
  Closed = 0,
}

export const getNextState = (
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

export const animateMove = (y: Animated.Value, toValue: number | Animated.Value, callback?: any) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: false,
  }).start((finished) => {
    finished && callback && callback()
  })
}