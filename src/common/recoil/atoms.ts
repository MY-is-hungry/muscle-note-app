import { atom } from 'recoil'

export const initialCurrentUserId = atom<string | null | undefined>({
  key: "currentUserId",
  default: ''
})

export const initialCurrentUser = atom<any>({
  key: "currentUser",
  default: { categories: [] }
})

// バックエンド処理のフラグ
export const initialIsProcessing = atom<boolean>({
  key: "isProcessing",
  default: false
})

export const initialErrorState = atom({
  key: "errorState",
  default: []
})

export const initialBgImage = atom({
  key: "bgImage",
  default: 'trainingroom'
})

// 種目選択ドロワートリガー
export const initialIsOpenEventDrawer = atom<boolean>({
  key: "isOpenEventDrawer",
  default: false
})

export const initialSelectEventName = atom<string>({
  key: "selectEventName",
  default: "全て"
})