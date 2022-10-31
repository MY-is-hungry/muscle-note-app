import ScrollWrapper from "@components/layout/ScrollWrapper"
import CategoryList from "../molecules/CategoryList"
import EventList from "../molecules/EventList"
import SelectEventDrawer from "../organisms/SelectEventDrawer"

const SelectEvent: React.FC<Props> = ({navigation}) => {
  return (
    <SelectEventDrawer onDrawerStateChange={() => {}}>
      <ScrollWrapper>
        <CategoryList/>
        <EventList navigation={navigation}/>
      </ScrollWrapper>
    </SelectEventDrawer>
  )
}

type Props = {
  navigation: any
}

export default SelectEvent