import { useCategories } from "@common/hooks/api/useCategory"
import { initialCurrentUser, initialDrawerScroll, initialSelectCategoryName } from "@common/recoil/atoms"
import { CategoryType } from "@common/types"
import { firebaseAuth } from "@common/utils/firebase"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import { getDatabase, ref, update } from "firebase/database"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { useRecoilState, useRecoilValue } from "recoil"
import { useTailwind } from "tailwind-rn/dist"
import SimpleText from "../atoms/CategoryName"
import CategoryList, { ALL_CATEGORY_OBJ } from "../molecules/CategoryList"
import ExerciseList from "../molecules/ExerciseList"
import SelectExerciseDrawer from "../organisms/SelectExerciseDrawer"

const SelectExercise: React.FC<Props> = ({navigation}) => {
  const [scroll, setScroll] = useRecoilState<boolean>(initialDrawerScroll)
  const tailwind = useTailwind()
  const { data: categories, isLoading: isCategoryLoading } = useCategories()
  const currentUser = useRecoilValue(initialCurrentUser)
  const existCategories: CategoryType[] = categories?.length ? categories : currentUser?.categories
  const [displayCategories, setDisplayCateogories] = useState<CategoryType[]>(existCategories)
  const selectedCategoryName = useRecoilValue(initialSelectCategoryName)

  // カテゴリの同期
  useEffect(() => {
    if(categories?.length) {
      const db = getDatabase()
      const userRef = ref(db, `users/${firebaseAuth?.currentUser?.uid}`)
      update(userRef, { categories: categories })
    }
  }, [categories])

  // カテゴリ絞り込み
  useEffect(() => {
    const newCategories = (selectedCategoryName === ALL_CATEGORY_OBJ.name) ?
      existCategories : existCategories.filter(category => category.name == selectedCategoryName)
    setDisplayCateogories(newCategories)
  }, [selectedCategoryName])

  return (
    <SelectExerciseDrawer onDrawerStateChange={() => {}}>
      <ScrollWrapper scrollEnabled={scroll}>
        { !isCategoryLoading &&
          <>
            <CategoryList/>
            <View style={tailwind('w-full mx-auto')}>
              {displayCategories?.map(category => {
                if(!category?.exercises?.length) return null
                return (
                  <View key={`category${category.id}`} style={tailwind('w-full')}>
                    <View style={tailwind('mt-6 pl-4')}>
                      <SimpleText text={category.name} color="white" size="xl"/>
                    </View>
                    <ExerciseList navigation={navigation} category={category}/>
                  </View>
                )
              })}
            </View>
          </>
        }
      </ScrollWrapper>
    </SelectExerciseDrawer>
  )
}

type Props = {
  navigation: any
}

export default SelectExercise