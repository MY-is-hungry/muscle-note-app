import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Others from '@screens/App/Others';
import BackgroundImage from '@screens/Others/BackgroundImage';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

const Stack = createNativeStackNavigator<RootStackParamList>();

const OthersNavigator = ({initialRouteName}: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1')}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Index" component={Others} />
        <Stack.Screen name="Background" component={BackgroundImage} />
      </Stack.Navigator>
    </View>
  )
}

type RootStackParamList = {
  Index: undefined
  Background: undefined
}
type Props = {
  initialRouteName: string
}

export default OthersNavigator
