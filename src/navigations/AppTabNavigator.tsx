import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import History from '@screens/History/History';
import Ranking from '@screens/Ranking/Ranking';
import Header from '@components/organisms/Header';
import { SCREEN_HEADER_NAME } from '@common/constants';
import OthersNavigator from './OthersNavigator';
import HomeNavigator from './HomeNavigator';
import TabBar from '@containers/layout/organisms/TabBar';

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppTabNavigator = ({navigation}: any) => {

  return (
    <Tab.Navigator 
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        header: ({ navigation, route, options }) => {
          return <Header title={SCREEN_HEADER_NAME[route?.name] || 'Muscle Note'} />;
        },
      }}
    >
      <Tab.Screen 
        name="HomeNavigator" 
        component={HomeNavigator} 
        options={{
          tabBarLabel: 'ホーム',
        }}
      />
      <Tab.Screen
        name="History" 
        component={History} 
        options={{
          tabBarLabel: 'トレ履歴',
        }}
      />
      <Tab.Screen
        name="PlaceholderScreen" 
        component={HomeNavigator} 
      />
      <Tab.Screen 
        name="Ranking" 
        component={Ranking} 
        options={{
          tabBarLabel: 'ランキング',
        }}
      />
      <Tab.Screen 
        name="OthersNavigator" 
        component={OthersNavigator}
        options={{
          tabBarLabel: 'その他',
        }}
      />
    </Tab.Navigator>
  )
}

type RootTabParamList = {
  HomeNavigator: undefined
  History: undefined
  PlaceholderScreen: undefined
  Ranking: undefined
  OthersNavigator: undefined
}
type Props = {
  initialRouteName: string
}

export default AppTabNavigator
