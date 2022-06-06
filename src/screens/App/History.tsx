import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '@components/organisms/Header';

const History = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <>
      <Header title={"トレーニング履歴"}/>
      <View style={tailwind('flex-1 justify-center items-center bg-transparent')}>
        <Text style={tailwind('text-white')}>Weightに飛べます！</Text>
        <Button title="Weight" onPress={() => navigation.navigate('Weight')}/>
      </View>
    </>
  )
}

export default History;