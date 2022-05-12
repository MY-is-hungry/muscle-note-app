import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SCREENS } from '../common/constants';
import Home from '../screens/App/Home';
import Test from '../screens/App/Test';

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        // options={{
        //   tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" color={color} size={26} />
        // }}
      />
      <Tab.Screen name="History" component={Test} />
      <Tab.Screen name="Weight" component={Test} />
      <Tab.Screen name="Setting" component={Test} />
    </Tab.Navigator>
  )
}

type RootTabParamList = {
  Home: undefined
  History: undefined
  Weight: undefined
  Setting: undefined
}
type Props = {
  initialRouteName: string
}

export default AppTabNavigator
