import { getDatabase, ref, set } from 'firebase/database';
import { firebaseAuth } from '@common/utils/firebase';
import HomeCalendar from '@containers/home/organisms/HomeCalendar';
import HomeLabelArea from '@containers/home/organisms/HomeLabelArea';
import HomeResultArea from '@containers/home/organisms/HomeResultArea';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import { useMonthlyRecord } from '@common/hooks/reactQuery';
import { getTotalVolume } from "@common/utils/number"
import StartTrainingButton from '@containers/home/atoms/StartTrainingButton';

const Home = ({ navigation }: any) => {
  const { data: monthlyRecord, isLoading: isMonthlyRecordLoading } = useMonthlyRecord({})
  const totalDate = monthlyRecord?.length
  const totalVolume = monthlyRecord?.reduce((total, eventRecord) => total + getTotalVolume(eventRecord?.records || []), 0)

  const testDB = () => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + firebaseAuth?.currentUser?.uid);
    set(reference, {
      highscore: 'score',
    });
  }

  return (
    <ScrollWrapper>
      <HomeCalendar monthlyRecord={monthlyRecord || []} navigation={navigation}/>
      <HomeLabelArea totalDate={totalDate} totalVolume={totalVolume}/>
      <StartTrainingButton/>
      <HomeResultArea totalDate={totalDate} totalVolume={totalVolume}/>
    </ScrollWrapper>
  )
}

export default Home;