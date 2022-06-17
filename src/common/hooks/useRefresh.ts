import { useRecoilState, useResetRecoilState } from "recoil"
import { initialErrorState, initialToastState } from "@common/recoil/atoms"

export const useRefresh = () => {
  const [toastState, setToastState] = useRecoilState(initialToastState)
  const resetErrorState = useResetRecoilState(initialErrorState)
  const refreshErrorToasts = async () => {
    
    await resetErrorState()
    // 時間で消えないエラー系のtoastのみ削除する
    // successメッセージなどがrouter.pushで消えてしまうため
    // TODO: 型定義
    const remainToastList = toastState.filter((toast: any) => toast.severity !== 'error')
    await setToastState(remainToastList)
  }
  return refreshErrorToasts
}