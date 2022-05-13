import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '../../components/organisms/Header';

const History = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <>
      <Header title={"トレーニング履歴"}/>
      <View style={tailwind('bg-white h-full')}>
        <View style={tailwind('flex-1 justify-center items-center')}>
          <Text style={tailwind('text-black')}>Weightに飛べます！</Text>
          <Button title="Weight" onPress={() => navigation.navigate('Weight')}/>
        </View>
      </View>
    </>
  )
}

export default History;