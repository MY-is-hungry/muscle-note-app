import { Dimensions } from "react-native";

// TODO: 横画面になった際に不具合があるので対処 https://zenn.dev/tasugi/articles/0814f06b514eed
const { height } = Dimensions.get('window');

export enum DrawerState {
  Open = height - 100,
  // Peek = 230,
  Closed = 0,
}