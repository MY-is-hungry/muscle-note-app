import { initialDrawerScroll } from "@common/recoil/atoms"
import CloseButton from "@components/atoms/CloseButton"
import ScrollWrapper from "@components/layout/ScrollWrapper"
import React, { useState } from "react"
import { useRecoilState } from "recoil"
import CategoryList from "../molecules/CategoryList"
import EventList from "../molecules/EventList"
import SelectEventDrawer from "../organisms/SelectEventDrawer"
import { useEffect } from 'react';

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