import { atom } from 'recoil'

export const initialCurrentUserId = atom<string | null | undefined>({
  key: "currentUserId",
  default: ''
})

export const initialCurrentUser = atom<any>({
  key: "currentUser",
  default: { categories: [] }
})

export const initialBgImage = atom({
  key: "bgImage",
  default: 'trainingroom'
})

export const initialIsOpenExerciseDrawer = atom<boolean>({
  key: "isOpenExerciseDrawer",
  default: false
})

export const initialSelectDate = atom<string>({
  key: "selectDate",
  default: ""
})

// 種目選択ドロワー内
//----------------------------------

export const initialDrawerScroll = atom<boolean>({
  key: "drawerScroll",
  default: true
})

export const initialSelectCategoryName = atom<string>({
  key: "selectExerciseName",
  default: "全て"
})
//----------------------------------