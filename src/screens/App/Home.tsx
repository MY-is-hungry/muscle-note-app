import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Home = ({ navigation }: any) => {
  console.log(navigation)
  const tailwind = useTailwind()
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Button title="History" onPress={() => navigation.navigate('History')}/>
    </View>
  )
}

export default Home;