import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Test = ({ navigation }: any) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('bg-white h-full')}>
      <Button title="Home" onPress={() => navigation.navigate('Home')}/>
      <Text style={tailwind('text-black')}>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

export default Test;