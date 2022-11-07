import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const History = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('flex-1 justify-center items-center bg-transparent px-6')}>
      <Text style={tailwind('text-white')}>Weightに飛べます！</Text>
      <Button title="Weight" onPress={() => navigation.navigate('Weight')}/>
    </View>
  )
}

export default History;