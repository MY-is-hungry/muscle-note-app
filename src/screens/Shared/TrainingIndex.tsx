import { useExercisesWithRecords } from "@common/hooks/api/useExercise"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import AddTrainingButton from "@containers/training/index/atoms/AddTrainingButton"
import RecordArea from "@containers/training/index/organisms/RecordArea"
import { useEffect } from "react"

const TrainingIndex: React.FC<Props> = ({navigation, route}) => { 
  const { date, exerciseId } = route.params
  const { data: exercises, isLoading: isExercisesLoading } = useExercisesWithRecords('daily', date)

  const handlePressFn = () => {
    console.log('a')
  }

  useEffect(() => {
    if(Boolean(exerciseId)) {
      navigation.navigate('TrainingNew', { date: date, exerciseId: exerciseId })
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

export default TrainingIndex