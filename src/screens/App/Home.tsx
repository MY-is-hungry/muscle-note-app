import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '../../components/organisms/Header';

const Home = ({ navigation }: any) => {
  console.log(navigation)
  const tailwind = useTailwind()
  return (
    <>
      <Header />
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('text-black')}>Historyに飛べます！</Text>
        <Button title="History" onPress={() => navigation.navigate('History')}/>
      </View>
    </>
  )
}

export default Home;