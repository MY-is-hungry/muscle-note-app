import { initialCurrentUser, initialSelectEventName } from '@common/recoil/atoms';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import { Button, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useTailwind } from 'tailwind-rn/dist';
import EventButton from '../atoms/EventButton';

export const ALL_CATEGORY_OBJ = {id: "0", name: '全て'}

const CategoryList: React.FC = ()=> {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const categoryList = [ALL_CATEGORY_OBJ, ...currentUser.categories]
  const [selectedEvent, setSelectedEvent] = useRecoilState(initialSelectEventName)

  const handleChangeSelectedEvent = (name: string) => {
    setSelectedEvent(name)
  }

  return (
    <View style={tailwind('flex flex-row flex-wrap justify-start items-center')}>
      {categoryList.map ((category) => {
        return <EventButton key={category.id} name={category.name} isSelected={category.name === selectedEvent} onPressFn={handleChangeSelectedEvent}/>
      })}
    </View>
  )
}
export default CategoryList