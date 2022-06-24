import { getDatabase, ref, set } from 'firebase/database';
import { firebaseAuth } from '@common/utils/firebase';
import HomeCalendar from '@containers/home/organisms/HomeCalendar';
import HomeLabelArea from '@containers/home/organisms/HomeLabelArea';
import HomeResultArea from '@containers/home/organisms/HomeResultArea';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import { useMonthlyRecord } from '@common/hooks/reactQuery';
import { currentMonth, currentYear } from '@common/utils/time';
import { getTotalVolume } from "@common/utils/number"

const Home = ({ navigation }: any) => {
  const { data: monthlyRecord, isLoading: isMonthlyRecordLoading } = useMonthlyRecord({})
  console.log(monthlyRecord)
  const totalDate = monthlyRecord?.data?.length
  const totalVolume = monthlyRecord?.data?.reduce((total, record) => total + getTotalVolume(record.eventRecords), 0)

  const testDB = () => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + firebaseAuth?.currentUser?.uid);
    set(reference, {
      highscore: 'score',
    });
  }

  return (
    <ScrollWrapper>
      <HomeCalendar monthlyRecord={monthlyRecord?.data || []}/>
      <HomeLabelArea totalDate={totalDate} totalVolume={totalVolume}/>
      <HomeResultArea totalDate={totalDate} totalVolume={totalVolume}/>
    </ScrollWrapper>
  )
}

export default Home;