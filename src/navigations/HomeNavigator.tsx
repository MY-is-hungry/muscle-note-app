import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@screens/Home/Home';
import BackgroundImage from '@screens/Others/BackgroundImage';
import TrainingDetail from '@screens/Shared/TrainingDetail';
import { Text, View } from 'react-native';
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
        <Stack.Screen name="TrainingDetail" component={TrainingDetail} />
      </Stack.Navigator>
    </View>
  )
}

type RootStackParamList = {
  Home: undefined
  TrainingDetail: undefined
}
type Props = {
  initialRouteName: string
}

export default HomeNavigator
