import { Entypo, FontAwesome5, Feather } from '@expo/vector-icons';

const TabIcon: React.FC<Props> = ({route, color}) => { 
  switch(route) {
    case 'ホーム': 
      return <Entypo name='home' size={28} color={color} />
    case 'トレ履歴':
      return <Entypo name='calendar' size={28} color={color} />
    case 'ランキング':
      return <FontAwesome5 name="crown" size={24} color={color} />
    case 'その他':
      return <Feather name="settings" size={28} color={color} />
    default:
      return null
  }
}

type Props = {
  route: string
  color: string
}

export default TabIcon
