import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { AntDesign, Entypo, Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Home from '@screens/App/Home';
import History from '@screens/App/History';
import Others from '@screens/App/Others';
import Ranking from '@screens/App/Ranking';
import Header from '@components/organisms/Header';
import { SCREEN_HEADER_NAME } from '@common/constants';
import OthersNavigator from './OthersNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppTabNavigator = ({navigation}: any) => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator 
      screenOptions={{
        // headerShown: false,
        header: ({ navigation, route, options }) => {
          return <Header title={SCREEN_HEADER_NAME[route?.name] || 'Muscle Note'} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.accent,
        tabBarStyle: {
          height: 80,
          borderTopColor: colors.background,
          backgroundColor: colors.background
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
        name="Ranking" 
        component={Ranking} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="crown" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Others" 
        component={OthersNavigator}
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
  Ranking: undefined
  Others: undefined
}
type Props = {
  initialRouteName: string
}

export default AppTabNavigator
