import { DailyRecordType } from "@common/types"
import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import RecordContainer from "../molecules/RecordContainer"

const RecordArea: React.FC<Props> = ({dailyRecord}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1')}>
      { dailyRecord?.eventRecords.map ((eventRecord) => {
        return <RecordContainer key={`event${eventRecord.id}`} eventRecord={eventRecord}/>
      })} 
    </View>
  )
}

type Props = {
  dailyRecord?: DailyRecordType
}

export default RecordArea