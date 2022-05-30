import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import Login from '@screens/Auth/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = ({initialRouteName}: Props) => {

  return (
    <View style={{ flex: 1 }}>
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
