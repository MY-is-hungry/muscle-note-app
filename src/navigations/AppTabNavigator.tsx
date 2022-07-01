import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, useTheme } from 'react-native-paper';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import History from '@screens/History/History';
import Ranking from '@screens/Ranking/Ranking';
import Header from '@components/organisms/Header';
import { SCREEN_HEADER_NAME } from '@common/constants';
import OthersNavigator from './OthersNavigator';
import HomeNavigator from './HomeNavigator';

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
        name="HomeNavigator" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'ホーム',
          tabBarIcon: ({ color }) => (
            <Entypo name='home' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="History" 
        component={History} 
        options={{
          tabBarLabel: 'トレ履歴',
          tabBarIcon: ({ color }) => (
            <Entypo name='calendar' size={25} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Ranking" 
        component={Ranking} 
        options={{
          tabBarLabel: 'ランキング',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="crown" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="OthersNavigator" 
        component={OthersNavigator}
        options={{
          tabBarLabel: 'その他',
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={25} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

type RootTabParamList = {
  HomeNavigator: undefined
  History: undefined
  Ranking: undefined
  OthersNavigator: undefined
}
type Props = {
  initialRouteName: string
}

export default AppTabNavigator
