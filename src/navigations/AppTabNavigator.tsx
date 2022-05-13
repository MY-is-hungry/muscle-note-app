import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SCREENS } from '../common/constants';
import { DISABLED_COLOR, PRIMARY_COLOR } from '../common/styles/themes';
import { tailwind } from '../common/utils/tailwind';
import { useTailwind } from 'tailwind-rn';
import { AntDesign, Entypo, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Home from '../screens/App/Home';
import History from '../screens/App/History';
import Weight from '../screens/App/Weight';
import Setting from '../screens/App/Setting';


const Tab = createBottomTabNavigator<RootTabParamList>();

const AppTabNavigator = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.disabled,
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name='home' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="History" 
        component={History} 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name='calendar' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Weight" 
        component={Weight} 
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="scale-bathroom" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Setting" 
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={25} color={color} />
          )
        }}
      />
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
