import { useRecoilState, useResetRecoilState } from "recoil"
import { initialErrorState } from "@common/recoil/atoms"

export const useRefresh = () => {
  const resetErrorState = useResetRecoilState(initialErrorState)
  const refreshErrorToasts = async () => {
    
    await resetErrorState()
    // 時間で消えないエラー系のtoastのみ削除する
    // successメッセージなどがrouter.pushで消えてしまうため
    // TODO: 型定義
  }
  return refreshErrorToasts
}