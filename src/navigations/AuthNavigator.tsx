import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import Login from '@screens/Auth/Login';
import { useTailwind } from 'tailwind-rn/dist';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = ({initialRouteName}: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 bg-transparent')}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </View>
  )
}

type RootStackParamList = {
  Login: undefined
  Tab: undefined
  App: undefined
  Home: undefined
}
type Props = {
  initialRouteName: string
}

export default AuthNavigator
