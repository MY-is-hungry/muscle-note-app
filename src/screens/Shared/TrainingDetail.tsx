import { useDailyRecord } from "@common/hooks/useRecord"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import AddTrainingButton from "@containers/training-detail/atoms/AddTrainingButton"
import RecordArea from "@containers/training-detail/organisms/RecordArea"
import { useEffect } from "react"

const TrainingDetail: React.FC<Props> = ({navigation, route}) => { 
  const { date, eventId } = route.params
  const { data: dailyRecord, isLoading: isDailyRecordLoading } = useDailyRecord(date)

  const handlePressFn = () => {
    console.log('a')
  }

  useEffect(() => {
    if(!!eventId) {
      navigation.navigate('TrainingInput', { date: date, eventId: eventId })
    }
  }, [eventId])

  return (
    <ScrollWrapper>
      <RecordArea dailyRecord={dailyRecord}/>
      <AddTrainingButton onPressFn={handlePressFn}/>
    </ScrollWrapper>
  )
}

type Props = {
  navigation: any
  route: any
}

export default TrainingDetail