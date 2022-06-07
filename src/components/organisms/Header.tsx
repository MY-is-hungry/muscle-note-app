import React from 'react';
import {View, Text} from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  title?: string;
  // ヘッダ左側の要素
  left?: React.ReactNode;
  // ヘッダ右側の要素
  right?: React.ReactNode;
};

const Header: React.VFC<Props> = ({title, left, right}) => {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('h-24 flex-row items-center bg-transparent')}>
      <View style={{flex: 0.25}}>{left}</View>
      <View style={tailwind('h-full flex-1 justify-end items-center')}>
        <Text style={tailwind('text-lg text-white font-semibold')}>
          {title ?? 'Muscle Note'}
        </Text>
      </View>
      <View style={{flex: 0.25}}>{right}</View>
    </View>
  );
};

export default Header;