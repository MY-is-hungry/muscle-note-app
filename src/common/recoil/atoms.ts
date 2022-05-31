import { atom } from 'recoil'

export const initialCurrentUserId = atom<string | null | undefined>({
  key: "currentUserId",
  default: ''
})