import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication'
import React from 'react'
import { Text, View, Alert } from 'react-native'
import { RootStackScreenProps } from '@common/types'
import { AuthCredential } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppleAuthentication } from '@common/hooks/useAppleAuthentication'
import { loginWithCredential } from '@common/utils/loginWithCredential'
import { useTailwind } from 'tailwind-rn';
import { AUTH_ALERT } from '@common/constants/alert'

type Props = NativeStackScreenProps<RootStackScreenProps>

const Login = ({ navigation }: Props) => {
  const tailwind = useTailwind()
  const [isAppleAuthAvailable, authWithApple] = useAppleAuthentication()

  const login = async (credential: AuthCredential, data?: any) => {
    const user = await loginWithCredential(credential, data)
    // navigation.navigate('Home')
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
    <View style={tailwind('flex-1 h-full justify-center items-center')}>
      <Text style={tailwind('text-lg')}>Login</Text>
      {isAppleAuthAvailable &&
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
      }
    </View>
  )
}
export default Login