import { initialDrawerScroll } from "@common/recoil/atoms"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import React from "react"
import { useRecoilState } from "recoil"
import CategoryList from "../molecules/CategoryList"
import EventList from "../molecules/ExerciseList"
import SelectEventDrawer from "../organisms/SelectExerciseDrawer"

const SelectEvent: React.FC<Props> = ({navigation}) => {
  const [scroll, setScroll] = useRecoilState<boolean>(initialDrawerScroll)

  return (
    <SelectEventDrawer onDrawerStateChange={() => {}}>
      <ScrollWrapper scrollEnabled={scroll}>
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