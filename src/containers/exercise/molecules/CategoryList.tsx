import { initialCurrentUser, initialSelectExerciseName } from '@common/recoil/atoms';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';
import { useTailwind } from 'tailwind-rn/dist';
import ExerciseButton from '../atoms/ExerciseButton';

export const ALL_CATEGORY_OBJ = {id: "0", name: '全て'}

const CategoryList: React.FC = ()=> {
  const tailwind = useTailwind()
  const [currentUser, setCurrentUser] = useRecoilState(initialCurrentUser)
  const categoryList = [ALL_CATEGORY_OBJ, ...currentUser.categories]
  const [selectedExercise, setSelectedExercise] = useRecoilState(initialSelectExerciseName)

  const handleChangeSelectedExercise = (name: string) => {
    setSelectedExercise(name)
  }

  return (
    <View style={tailwind('flex flex-row flex-wrap justify-start items-center')}>
      {categoryList.map ((category) => {
        return <ExerciseButton key={category.id} name={category.name} isSelected={category.name === selectedExercise} onPressFn={handleChangeSelectedExercise}/>
      })}
    </View>
  )
}
export default CategoryList