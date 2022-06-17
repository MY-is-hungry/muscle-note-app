import { atom } from 'recoil'

export const initialCurrentUserId = atom<string | null | undefined>({
  key: "currentUserId",
  default: ''
})

export const initialToastState = atom({
  key: "toastState",
  default: []
})


export const initialErrorState = atom({
  key: "errorState",
  default: []
})