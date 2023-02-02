import { useExercisesWithRecords } from "@common/hooks/api/useExercise"
import { initialIsOpenExerciseDrawer, initialSelectDate } from "@common/recoil/atoms"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import AddTrainingButton from "@containers/training/index/atoms/AddTrainingButton"
import RecordArea from "@containers/training/index/organisms/RecordArea"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"

const TrainingIndex: React.FC<Props> = ({navigation, route}) => { 
  const { date, exercise } = route.params
  const { data: exercises, isLoading: isExercisesLoading } = useExercisesWithRecords('daily', date)
  const setSelectDate = useSetRecoilState(initialSelectDate)
  const [isOpenExerciseDrawer, setIsOpenExerciseDrawer] = useRecoilState(initialIsOpenExerciseDrawer)

  const handlePressFn = () => {
    setSelectDate(date)
    setIsOpenExerciseDrawer(!isOpenExerciseDrawer)
  }

  useEffect(() => {
    if(Boolean(exercise?.id)) {
      navigation.navigate('TrainingNew', { date: date, exercise: exercise })
    }
  }, [])

  return (
    <ScrollWrapper>
      { exercises?.length ? <RecordArea exercises={exercises}/> : null }
      <AddTrainingButton onPressFn={handlePressFn}/>
    </ScrollWrapper>
  )
}

type Props = {
  navigation: any
  route: any
}

export default TrainingIndex