import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Home = ({ navigation }: any) => {
  console.log(navigation)
  const tailwind = useTailwind()
  return (
    <View>
      <Button title="Test" onPress={() => navigation.navigate('Test')}/>
    </View>
  );
};

export default Home;