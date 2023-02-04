import { REQUIRE_BG_IMAGES } from "@common/constants";
import { initialBgImage, initialCurrentUser, initialIsOpenExerciseDrawer } from '@common/recoil/atoms';
import { firebaseAuth, isAuth } from "@common/utils/firebase";
import CloseButton from "@components/atoms/CloseButton";
import AppNavigator from "@navigations/AppNavigator";
import AuthNavigator from "@navigations/AuthNavigator";
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import { useRecoilState } from "recoil";
import { useTailwind } from "tailwind-rn/dist";

const Layout: React.FC = () => {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const [bgImage, setBgImage] = useRecoilState(initialBgImage)
  const [isOpenExerciseDrawer, setIsOpenExerciseDrawer] = useRecoilState(initialIsOpenExerciseDrawer)
  type OnlyKeys = keyof typeof bgImage
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(
    isAuth ? <AppNavigator initialRouteName='Home' /> : <AuthNavigator initialRouteName='Login' />
  )

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!!user?.uid) {
        setRenderComponent(<AppNavigator initialRouteName='Home' />)
      } else {
        setRenderComponent(<AuthNavigator initialRouteName='Login' />)
      }
    })
  }, [])

  // 背景画像読み込み
  // TODO: 呼び出し回数が多すぎるから削減できるか確認
  useEffect(() => {
    const db = getDatabase()
    onValue(ref(db, '/users/' + firebaseAuth?.currentUser?.uid), (snapshot) => {
      const user = (snapshot.val() && snapshot.val()) || {}
      setCurrentUser(user)
      setBgImage(user.backgroundImage || 'trainingroom')
    }, {
      onlyOnce: true
    })
  }, [firebaseAuth?.currentUser])

  return (
    <ImageBackground source={REQUIRE_BG_IMAGES[bgImage as keyof OnlyKeys] as ImageSourcePropType} resizeMode="cover" style={tailwind('flex-1 w-full h-full')}>
      <View style={tailwind('flex-1 bg-black bg-opacity-50')}>
        <StatusBar style="auto" />
        {renderComponent}
        { isOpenExerciseDrawer && <CloseButton onPressFn={() => setIsOpenExerciseDrawer(false)}/>}
      </View>
    </ImageBackground>
  )
}
export default Layout