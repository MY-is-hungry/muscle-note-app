import { initialIsOpenExerciseDrawer, initialSelectDate } from "@common/recoil/atoms"
import { CategoryType, ExerciseType } from "@common/types"
import { getSplitTime } from "@common/utils/time"
import ButtonLabel from "@components/atoms/ButtonLabel"
import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

const ExerciseList: React.FC<Props> = ({navigation, category}) => {
  const setIsOpenExerciseDrawer = useSetRecoilState(initialIsOpenExerciseDrawer)
  const selectDate = useRecoilValue(initialSelectDate)

  const renderTodayTrainingIndex = (e:any, exercise:ExerciseType) => {
    e.stopPropagation()
    setIsOpenExerciseDrawer(false)
    if (selectDate) {
      navigation.navigate('TrainingNew', { date: selectDate, exercise: exercise })
    } else {
      const formatDate = getSplitTime(String(new Date()), 'yyyy-MM-dd')
      navigation.navigate('TrainingIndex', { date: formatDate, exercise: exercise })
    }
  }

  return (
    <>
      {category.exercises?.map(exercise =>
        <ButtonLabel
          key={`exercise${exercise.id}`}
          name={exercise.name}
          onPressFn={(e) => renderTodayTrainingIndex(e, exercise)}
        />
      )}
    </>
  )
}

type Props = {
  navigation: any
  category: CategoryType
}

export default ExerciseList