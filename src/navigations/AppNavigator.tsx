import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import AppTabNavigator from './AppTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ({initialRouteName}: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Tab" component={AppTabNavigator} />
      </Stack.Navigator>
    </View>
  )
}

type RootStackParamList = {
  Tab: undefined
}
type Props = {
  initialRouteName: string
}

export default AppNavigator
