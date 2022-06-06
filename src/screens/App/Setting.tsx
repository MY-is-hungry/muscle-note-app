import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '@components/organisms/Header';

const Setting = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <>
      <Header title={"設定"}/>
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-white')}>Homeに飛べます！</Text>
        <Button title="Home" onPress={() => navigation.navigate('Home')}/>
      </View>
    </>
  )
}

export default Setting;