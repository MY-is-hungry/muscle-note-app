import { ReactNode, useEffect, useState } from "react"
import { initialBgImage, initialCurrentUser } from '@common/recoil/atoms';
import { useRecoilState } from "recoil";
import { firebaseAuth } from "@common/utils/firebase";
import { useTailwind } from "tailwind-rn/dist";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import AppNavigator from "@navigations/AppNavigator";
import AuthNavigator from "@navigations/AuthNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import { REQUIRE_BG_IMAGES } from "@common/constants";

const Layout: React.FC = () => { 
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const [bgImage, setBgImage] = useRecoilState(initialBgImage)
  type OnlyKeys = keyof typeof bgImage
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(
    firebaseAuth?.currentUser ? <AppNavigator initialRouteName='Home' /> : <AuthNavigator initialRouteName='Login' />
  )

  // ログイン状態確認
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setRenderComponent(<AppNavigator initialRouteName='Home' />)
      } else {
        setRenderComponent(<AuthNavigator initialRouteName='Login' />)
      }
    })
  }, [])

  // 背景画像読み込み
  // TODO: 呼び出し回数が多すぎるから、確認
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
    <ImageBackground source={REQUIRE_BG_IMAGES[bgImage as keyof OnlyKeys] as ImageSourcePropType} resizeMode="cover" style={tailwind('flex-1 justify-center w-full h-full')}>
      <View style={tailwind('flex-1 bg-black bg-opacity-60')}>
        <StatusBar style="auto" />
        {renderComponent}
      </View>
    </ImageBackground>
  )
}
export default Layout