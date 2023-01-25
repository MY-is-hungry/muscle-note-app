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


// 種目選択ドロワー
//----------------------------------
export const initialIsOpenExerciseDrawer = atom<boolean>({
  key: "isOpenExerciseDrawer",
  default: false
})

export const initialDrawerScroll = atom<boolean>({
  key: "drawerScroll",
  default: true
})

export const initialSelectExerciseName = atom<string>({
  key: "selectExerciseName",
  default: "全て"
})
//----------------------------------