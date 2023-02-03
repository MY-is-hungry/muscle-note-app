import ScrollWrapper from '@components/layout/ScrollWrapper';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const History = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <ScrollWrapper>
      <View style={tailwind('flex-1 justify-center items-center bg-transparent px-6')}>
        <Text style={tailwind('text-white')}>Coming soon...</Text>
        {/* <Button title="Weight" onPress={() => navigation.navigate('Weight')}/> */}
      </View>
    </ScrollWrapper>
  )
}

export default History;