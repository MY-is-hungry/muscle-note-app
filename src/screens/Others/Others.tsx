import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import ButtonLabel from '@components/atoms/ButtonLabel';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import { logout } from '@common/utils/auth';
import { useRecoilState } from 'recoil';
import { initialCurrentUser } from '@common/recoil/atoms';

const Others = ({ navigation }: any) => {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)

  const onPressLogout = () => {
    logout()
    currentUser && setCurrentUser({ events: [] })
  }

  return (
    <ScrollWrapper>
      <ButtonLabel name="ログアウト" onPressFn={onPressLogout}/>
      <ButtonLabel name="アプリ背景変更" onPressFn={() => navigation.navigate('Background')} isArrow={true}/>
    </ScrollWrapper>
  )
}

export default Others;