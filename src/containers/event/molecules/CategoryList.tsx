import { initialCurrentUser } from '@common/recoil/atoms';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useTailwind } from 'tailwind-rn/dist';
import EventButton from '../atoms/EventButton';

const CategoryList = () => {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const eventList = ['全て'].concat(currentUser.events)
  const [selectedEvent, setSelectedEvent] = useState('全て')

  const handleChangeSelectedEvent = (eventName: string) => {
    console.log(eventName)
    setSelectedEvent(eventName)
  }
  
  return (
    <View style={tailwind('flex flex-row flex-wrap justify-start items-center')}>
      {eventList.map ((eventName) => {
        return <EventButton key={eventName} name={eventName} isSelected={eventName === selectedEvent} onPressFn={handleChangeSelectedEvent}/>
      })}
    </View>
  )
}
export default CategoryList