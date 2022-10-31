import { EventRecordType } from "@common/types"
import { getTotalVolume } from "@common/utils/number"
import { Text, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import RecordLine from "../atoms/RecordLine"
import TotalVolumeLine from "../atoms/TotalVolumeLine"

const RecordContainer: React.FC<Props> = ({eventRecord}) => { 
  const tailwind = useTailwind()

  return (
    <View style={tailwind('w-80 p-6 mb-8 rounded-3xl bg-transp-gray')}>
      <Text style={tailwind('mb-2 text-white text-lg')}>{eventRecord?.event?.name}</Text>
      { eventRecord?.records?.map ((record, i) => {
        return <RecordLine key={`record${record.id}`} record={record} number={i+1}/>
      })}
      <TotalVolumeLine volume={getTotalVolume(eventRecord?.records || [])}/>
    </View>
  )
}

type Props = {
  eventRecord?: EventRecordType
}

export default RecordContainer