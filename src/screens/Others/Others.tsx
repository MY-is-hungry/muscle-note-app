import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import ButtonLabel from '@components/atoms/ButtonLabel';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import { logout } from '@common/utils/auth';
import { useRecoilState } from 'recoil';
import { initialCurrentUserId } from '@common/recoil/atoms';

const Others = ({ navigation }: any) => {
  const tailwind = useTailwind()
  const [currentUserId, setCurrentUserId] = useRecoilState(initialCurrentUserId)

  const onPressLogout = () => {
    logout()
    currentUserId && setCurrentUserId('')
  }

  return (
    <ScrollWrapper>
      <ButtonLabel name="ログアウト" onPressFn={onPressLogout}/>
      <ButtonLabel name="アプリ背景変更" onPressFn={() => navigation.navigate('Background')} isArrow={true}/>
    </ScrollWrapper>
  )
}

export default Others;