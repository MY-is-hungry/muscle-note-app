import React from 'react'
import { Text, View } from 'react-native'
import { RootStackScreenProps } from '@common/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn';
import AppleAuthButton from '@containers/Login/atoms/AppleAuthButton';

type Props = NativeStackScreenProps<RootStackScreenProps>

const Login = ({ navigation }: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 h-full justify-center items-center')}>
      <Text style={tailwind('text-lg')}>Login</Text>
      <AppleAuthButton />
    </View>
  )
}
export default Login