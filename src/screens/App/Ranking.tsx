import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '../../components/organisms/Header';

const Ranking = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <>
      <Header title={"ランキング"}/>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-white')}>
          これまでのトレーニング実績をランキング形式で確認できます。
        </Text>
      </View>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-white')}>Settingに飛べます！</Text>
        <Button title="Setting" onPress={() => navigation.navigate('Setting')}/>
      </View>
    </>
  )
}

export default Ranking;