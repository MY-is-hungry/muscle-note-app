import React from 'react'
import { Text, View } from 'react-native'
import { RootStackScreenProps } from '@common/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn';
import AppleAuthButton from '@containers/login/atoms/AppleAuthButton';

type Props = NativeStackScreenProps<RootStackScreenProps>

const Login = ({ navigation }: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 justify-center items-center bg-transparent')}>
      <Text style={tailwind('text-lg')}>Sign upして始めましょう！</Text>
      <AppleAuthButton />
    </View>
  )
}
export default Login