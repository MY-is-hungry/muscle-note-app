import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Ranking: React.FC = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('flex-1')}>
      <View style={tailwind('flex-initial justify-center items-center px-6')}>
        <Text style={tailwind('text-white')}>
          これまでのトレーニング実績をランキング形式で確認できます。
        </Text>
      </View>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-white')}>Othersに飛べます！</Text>
        <Button title="Others" onPress={() => navigation.navigate('Others')}/>
      </View>
    </View>
  )
}

export default Ranking;