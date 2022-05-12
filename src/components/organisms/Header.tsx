import React from 'react';
import {View, Text} from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  /** ヘッダに表示するタイトル */
  title: string;
  /** ヘッダ左側の要素 */
  left?: React.ReactNode;
  /** ヘッダ右側の要素 */
  right?: React.ReactNode;
};

const Header: React.VFC<Props> = ({title, left, right}) => {
  const tailwind = useTailwind()
  return (
    <View
      style={tailwind('h-16 flex-row items-center')}>
      <View style={{flex: 0.25}}>{left}</View>
      <Text style={tailwind('flex-1 align-center items-center')}>
        {title ?? ''}
      </Text>
      <View style={{flex: 0.25}}>{right}</View>
    </View>
  );
};

export default Header;