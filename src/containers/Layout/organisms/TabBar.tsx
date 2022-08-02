import React from 'react' 
import {View, Pressable, Dimensions, StyleSheet} from 'react-native'
import NavigationIcon from '../molecules/NavigationIcon'
import { CLEAR_WHITE_COLOR, PRIMARY_COLOR } from '@common/styles/themes';
import { useTailwind } from 'tailwind-rn/dist';
import { Button, IconButton } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { initialIsOpenEventDrawer } from '@common/recoil/atoms';

const {width} = Dimensions.get('window')

const TabBar = ({ state, descriptors, navigation }: any) =>{
  const [isOpenEventDrawer, setIsOpenEventDrawer] = useRecoilState(initialIsOpenEventDrawer)
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-row absolute bottom-0 bg-navy px-2')}>
      {state.routes.map((route: any , index: number) => {
        if(route.name == "PlaceholderScreen"){
          return (
            <View key={index} style={tailwind('flex justify-center items-center')}>
              <IconButton 
                icon='plus-circle'
                color={PRIMARY_COLOR}
                size={40}
                onPress={() => setIsOpenEventDrawer(!isOpenEventDrawer)}
                style={tailwind('mb-5')}
              />
            </View>
          )
        }
        
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <View key={index} style={tailwind('h-18 flex-1 justify-center items-center mt-1')}>
            <Pressable
              onPress={onPress}
              style={tailwind(`rounded-xl ${isFocused ? 'bg-selected2' : '' }`)}>
              <View style={tailwind('flex justify-center items-center px-3 py-3')}>
                <NavigationIcon route={label} isFocused={isFocused}/>
              </View>
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}
export default TabBar