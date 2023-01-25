import { initialDrawerScroll } from "@common/recoil/atoms"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import React from "react"
import { useRecoilState } from "recoil"
import CategoryList from "../molecules/CategoryList"
import ExerciseList from "../molecules/ExerciseList"
import SelectExerciseDrawer from "../organisms/SelectExerciseDrawer"

const SelectExercise: React.FC<Props> = ({navigation}) => {
  const [scroll, setScroll] = useRecoilState<boolean>(initialDrawerScroll)

  return (
    <SelectExerciseDrawer onDrawerStateChange={() => {}}>
      <ScrollWrapper scrollEnabled={scroll}>
        <CategoryList/>
        <ExerciseList navigation={navigation}/>
      </ScrollWrapper>
    </SelectExerciseDrawer>
  )
}

type Props = {
  navigation: any
}

export default SelectExercise