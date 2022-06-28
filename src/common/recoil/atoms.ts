import { atom } from 'recoil'

export const initialCurrentUserId = atom<string | null | undefined>({
  key: "currentUserId",
  default: ''
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