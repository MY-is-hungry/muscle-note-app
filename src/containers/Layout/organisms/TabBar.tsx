import { initialIsOpenExerciseDrawer } from '@common/recoil/atoms';
import { PRIMARY_COLOR } from '@common/styles/themes';
import SelectExercise from '@containers/exercise/templates/SelectExercise';
import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { useTailwind } from 'tailwind-rn/dist';
import NavigationIcon from '../molecules/NavigationIcon';

const {width} = Dimensions.get('window')

const TabBar = ({ state, descriptors, navigation }: any) =>{
  const [isOpenExerciseDrawer, setIsOpenExerciseDrawer] = useRecoilState(initialIsOpenExerciseDrawer)
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-row absolute bottom-0 bg-navy')}>
      {state.routes.map((route: any , index: number) => {
        if(route.name == "PlaceholderScreen"){
          return (
            <React.Fragment key={index}>
              <View style={tailwind('flex justify-center items-center')}>
                <IconButton
                  icon='plus-circle'
                  color={PRIMARY_COLOR}
                  size={40}
                  onPress={() => setIsOpenExerciseDrawer(!isOpenExerciseDrawer)}
                  style={tailwind('mb-5')}
                />
              </View>
              {isOpenExerciseDrawer && <SelectExercise navigation={navigation}/>}
            </React.Fragment>

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