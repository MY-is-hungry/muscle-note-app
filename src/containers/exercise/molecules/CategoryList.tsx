import { initialCurrentUser, initialSelectCategoryName } from '@common/recoil/atoms';
import { firebaseAuth } from '@common/utils/firebase';
import { getDatabase, onChildAdded, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTailwind } from 'tailwind-rn/dist';
import ExerciseButton from '../atoms/ExerciseButton';

export const ALL_CATEGORY_OBJ = {id: '', name: '全て'}

const CategoryList: React.FC = ()=> {
  const tailwind = useTailwind()
  const currentUser = useRecoilValue(initialCurrentUser)
  const localCategories = currentUser?.categories || []
  const [displayCategories, setDisplayCategories] = useState([ALL_CATEGORY_OBJ, ...localCategories])
  const [selectedCategoryName, setSlectedCategoryName] = useRecoilState(initialSelectCategoryName)
  const db = getDatabase()
  const categoriesRef = ref(db, `users/${firebaseAuth?.currentUser?.uid}`)

  const handleChangeSelectedExercise = (name: string) => {
    setSlectedCategoryName(name)
  }

  useEffect(() => {
    onChildAdded(categoriesRef, (data) => {
      if (data.key === 'categories') {
        const newCategories = data.val()
        newCategories.unshift(ALL_CATEGORY_OBJ)
        console.log(newCategories)
        setDisplayCategories(newCategories)
      }
    })
  }, [])

  console.log(displayCategories)

  return (
    <View style={tailwind('flex flex-row flex-wrap justify-start items-center')}>
      {displayCategories.map ((category) =>
        <ExerciseButton
          key={`categoryList${category.id}`}
          name={category.name}
          isSelected={category.name === selectedCategoryName}
          onPressFn={handleChangeSelectedExercise}
        />
      )}
    </View>
  )
}

export default CategoryList