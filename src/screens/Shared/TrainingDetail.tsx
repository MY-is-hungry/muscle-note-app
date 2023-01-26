import { useExercisesWithRecords } from "@common/hooks/useExercise"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import AddTrainingButton from "@containers/training-detail/atoms/AddTrainingButton"
import RecordArea from "@containers/training-detail/organisms/RecordArea"
import { useEffect } from "react"

const TrainingDetail: React.FC<Props> = ({navigation, route}) => { 
  const { date, exerciseId } = route.params
  const { data: exercises, isLoading: isExercisesLoading } = useExercisesWithRecords('daily', date)

  const handlePressFn = () => {
    console.log('a')
  }

  useEffect(() => {
    if(Boolean(exerciseId)) {
      navigation.navigate('TrainingInput', { date: date, exerciseId: exerciseId })
    }
  }, [exerciseId])

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

export default TrainingDetail