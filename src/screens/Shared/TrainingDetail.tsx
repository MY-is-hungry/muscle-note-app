import { useDailyRecord } from "@common/hooks/reactQuery"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import AddTrainingButton from "@containers/training-detail/atoms/AddTrainingButton"
import RecordArea from "@containers/training-detail/organisms/RecordArea"

const TrainingDetail: React.FC<Props> = ({navigation, route}) => { 
  const { date } = route.params
  const { data: dailyRecord, isLoading: isDailyRecordLoading } = useDailyRecord({
    deps: date,
    urlParams: { date: date }
  })
  console.log(dailyRecord)

  const handlePressFn = () => {
    console.log('a')
  }

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