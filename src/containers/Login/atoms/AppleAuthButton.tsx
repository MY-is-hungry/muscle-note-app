import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication'
import React from 'react'
import { Alert } from 'react-native'
import { AuthCredential } from 'firebase/auth'
import { useAppleAuthentication } from '@common/hooks/useAppleAuthentication'
import { loginWithCredential, logout } from '@common/utils/auth'
import { AUTH_ALERT } from '@common/constants/alert'
import { useSetRecoilState } from 'recoil';
import { initialCurrentUserId } from '@common/recoil/atoms';
import { useSignUpMutation } from '@common/hooks/reactQuery'

const AppleAuthButton = () => { 
  const [isAppleAuthAvailable, authWithApple] = useAppleAuthentication()
  const setCurrentUserId = useSetRecoilState(initialCurrentUserId)
  const userSignupMutation = useSignUpMutation({
    options: {
      onSuccess: (res: any) => { 
        console.log(res)
        setCurrentUserId(res.data.fbUid)
      },
      onError: () => {
        logout()
        Alert.alert(AUTH_ALERT.title, AUTH_ALERT.msg)
      }
    }
  })

  const login = async (credential: AuthCredential, data?: any) => {
    const user = await loginWithCredential(credential, data)
    if (user?.uid) {
      userSignupMutation.mutate({user: { name: user.displayName, email: user.email, fb_uid: user.uid }})
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