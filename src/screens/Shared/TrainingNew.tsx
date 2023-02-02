import ScrollWrapper from "@components/layout/ScrollWrapper"
import Form from "@containers/training/new/organisms/Form"
import { useTailwind } from "tailwind-rn/dist"

const TrainingNew: React.FC<Props> = ({navigation, route}) => {
  const { date, exercise } = route.params
  const tailwind = useTailwind()

  return (
    <ScrollWrapper>
      <Form exercise={exercise} navigation={navigation} date={date}/>
    </ScrollWrapper>
  )
}

type Props = {
  navigation: any
  route: any
}

export default TrainingNew