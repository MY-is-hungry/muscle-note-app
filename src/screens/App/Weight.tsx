import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Header from '../../components/organisms/Header';

const Weight = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <>
      <Header title={"体重管理"}/>
      <View style={tailwind('bg-white h-full')}>
        <View style={tailwind('flex-1 justify-center items-center')}>
          <Text style={tailwind('text-black')}>Settingに飛べます！</Text>
          <Button title="Setting" onPress={() => navigation.navigate('Setting')}/>
        </View>
      </View>
    </>
  )
}

export default Weight;