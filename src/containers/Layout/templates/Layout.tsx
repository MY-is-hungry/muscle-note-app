import { ReactNode, useEffect, useState } from "react"
import { initialBgImage, initialCurrentUser, initialIsOpenEventDrawer } from '@common/recoil/atoms';
import { useRecoilState } from "recoil";
import { firebaseAuth, isAuth } from "@common/utils/firebase";
import { useTailwind } from "tailwind-rn/dist";
import { ImageBackground, ImageSourcePropType, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import AppNavigator from "@navigations/AppNavigator";
import AuthNavigator from "@navigations/AuthNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { REQUIRE_BG_IMAGES } from "@common/constants";
import CloseButton from "@components/atoms/CloseButton";
// import { useCategories } from "@common/hooks/reactQuery";

const Layout: React.FC = () => {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const [bgImage, setBgImage] = useRecoilState(initialBgImage)
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useRecoilState(initialIsOpenEventDrawer)
  type OnlyKeys = keyof typeof bgImage
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(
    isAuth ? <AppNavigator initialRouteName='Home' /> : <AuthNavigator initialRouteName='Login' />
  )
  // const { data: categories, isLoading: isCategoryLoading } = useCategories({})

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

  // useEffect(() => {
  //   if(firebaseAuth?.currentUser?.uid && !isCategoryLoading) {
  //     const db = getDatabase()
  //     const reference = ref(db, `users/${firebaseAuth.currentUser.uid}`)
  //     update(reference, { categories: categories })
  //   }
  // }, [categories])

  return (
    <ImageBackground source={REQUIRE_BG_IMAGES[bgImage as keyof OnlyKeys] as ImageSourcePropType} resizeMode="cover" style={tailwind('flex-1 w-full h-full')}>
      <View style={tailwind('flex-1 bg-black bg-opacity-50')}>
        <StatusBar style="auto" />
        {renderComponent}
        { isOpenEventDrawer && <CloseButton onPressFn={() => setIsOpenEventDrawer(false)}/>}
      </View>
    </ImageBackground>
  )
}
export default Layout