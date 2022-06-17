import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication'
import React from 'react'
import { Alert } from 'react-native'
import { AuthCredential } from 'firebase/auth'
import { useAppleAuthentication } from '@common/hooks/useAppleAuthentication'
import { loginWithCredential } from '@common/utils/loginWithCredential'
import { AUTH_ALERT } from '@common/constants/alert'
import { useSetRecoilState } from 'recoil';
import { initialCurrentUserId } from '@common/recoil/atoms';

const AppleAuthButton = () => { 
  const [isAppleAuthAvailable, authWithApple] = useAppleAuthentication()
  const setCurrentUserId = useSetRecoilState(initialCurrentUserId)

  const login = async (credential: AuthCredential, data?: any) => {
    const user = await loginWithCredential(credential, data)
    console.log('user', user)
    if (user?.uid) {
      setCurrentUserId(user.uid)
    }
  }

  const loginWithApple = async () => {
    try {
      const [credential, data] = await authWithApple()
      await login(credential, data)
    } catch (error: any) {
      console.error(error)
      Alert.alert(AUTH_ALERT.title, AUTH_ALERT.msg)
    }
  }
  
  return (
    isAppleAuthAvailable ?
      <AppleAuthenticationButton
        // HACK: SIGN_INとSIGN_UP分けれたら良いかも
        buttonType={AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={50}
        style={{
          width: '75%',
          height: 50,
          marginTop: 16,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={loginWithApple}
      />
      :
      null
  )
}
export default AppleAuthButton