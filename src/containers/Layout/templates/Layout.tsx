import { ReactNode, useEffect, useState } from "react"
import { initialCurrentUserId } from '@common/recoil/atoms';
import { useRecoilState } from "recoil";
import { firebaseAuth } from "@common/utils/firebase";
import { useTailwind } from "tailwind-rn/dist";
import { ImageBackground, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import AppNavigator from "@navigations/AppNavigator";
import AuthNavigator from "@navigations/AuthNavigator";
import { onAuthStateChanged } from "firebase/auth";

const Layout: React.FC = () => { 
  const tailwind = useTailwind()
  const [currentUserId, setCurrentUserId] = useRecoilState(initialCurrentUserId)
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(
    firebaseAuth?.currentUser ? <AppNavigator initialRouteName='Home' /> : <AuthNavigator initialRouteName='Login' />
  )

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // サインイン中
        console.log('ログイン済み')
        setRenderComponent(<AppNavigator initialRouteName='Home' />)
      } else {
        // サインアウト中
        console.log('非ログイン')
        setRenderComponent(<AuthNavigator initialRouteName='Login' />)
      }
    })
  }, [])

  useEffect(() => {
    setCurrentUserId(firebaseAuth?.currentUser?.uid)
  }, [firebaseAuth?.currentUser?.uid, firebaseAuth?.currentUser])

  return (
    <ImageBackground source={require('/assets/iphone/background/trainingroom-iphone.jpg')} resizeMode="cover" style={tailwind('flex-1 justify-center w-full h-full')}>
      <View style={tailwind('flex-1 bg-black bg-opacity-60')}>
        <StatusBar style="auto" />
        {renderComponent}
      </View>
    </ImageBackground>
  )
}
export default Layout