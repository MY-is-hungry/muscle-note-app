import { useCategories } from "@common/hooks/useCategory"
import { initialCurrentUser, initialIsOpenEventDrawer, initialSelectEventName } from "@common/recoil/atoms"
import { CategoryType } from "@common/types"
import { getSplitTime } from "@common/utils/time"
import ButtonLabel from "@components/atoms/ButtonLabel"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useTailwind } from "tailwind-rn/dist"
import SimpleText from "../atoms/CategoryName"
import { ALL_CATEGORY_OBJ } from "./CategoryList"

const EventList: React.FC<Props> = ({navigation}) => {
  const tailwind = useTailwind()
  const setIsOpenEventDrawer = useSetRecoilState(initialIsOpenEventDrawer)

  const { data: categories } = useCategories()
  const currentUser = useRecoilValue(initialCurrentUser)
  const [selectedCategoryName, setselectedCategoryName] = useRecoilState(initialSelectEventName)
  const existCategories: CategoryType[] = categories?.length ? categories : currentUser?.categories
  const [displayCategories, setDisplayCateogories] = useState<CategoryType[]>(existCategories)

  const renderTodayTrainingDetail = (e:any, exerciseId: number) => {
    e.stopPropagation();
    const formatDate = getSplitTime(String(new Date()), 'yyyy-MM-dd')
    setIsOpenEventDrawer(false)
    navigation.navigate('TrainingDetail', { date: formatDate, exerciseId: exerciseId })
  }

  useEffect(() => {
    const newCategories = selectedCategoryName == ALL_CATEGORY_OBJ.name ?
      existCategories : existCategories.filter(category => category.name == selectedCategoryName)
    setDisplayCateogories(newCategories)
  }, [selectedCategoryName])


  return (
    <View style={tailwind('w-full mx-auto')}>
      {displayCategories?.map(category => {
        return (
          <View key={`category${category.id}`} style={tailwind('w-full')}>
            <View style={tailwind('mt-6 pl-4')}>
              <SimpleText text={category.name} color="white" size="xl"/>
            </View>
            { category.exercises?.map(exercise => {
              return <ButtonLabel key={`exercise${exercise.id}`} name={exercise.name} onPressFn={(e) => renderTodayTrainingDetail(e, exercise.id)}/>
            })}
          </View>
        )
      })}
    </View>
  )
}

type Props = {
  navigation: any
}

export default EventList