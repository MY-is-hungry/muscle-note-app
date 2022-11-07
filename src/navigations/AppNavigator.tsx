import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ({initialRouteName}: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1')}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Tab" component={TabNavigator} />
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
