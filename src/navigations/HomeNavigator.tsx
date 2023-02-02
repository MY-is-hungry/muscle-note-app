import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home/Home';
import TrainingIndex from '@screens/Shared/TrainingIndex';
import TrainingNew from '@screens/Shared/TrainingNew';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = ({initialRouteName}: Props) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1')}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TrainingIndex" component={TrainingIndex} />
        <Stack.Screen name="TrainingNew" component={TrainingNew} />
      </Stack.Navigator>
    </View>
  )
}

type RootStackParamList = {
  Home: undefined
  TrainingIndex: undefined
  TrainingNew: undefined
}
type Props = {
  initialRouteName: string
}

export default HomeNavigator
