import { useMonthlyRecord } from '@common/hooks/useRecord';
import { firebaseAuth } from '@common/utils/firebase';
import { getTotalVolume } from "@common/utils/number";
import ScrollWrapper from '@components/layout/ScrollWrapper';
import StartTrainingButton from '@containers/home/atoms/StartTrainingButton';
import HomeCalendar from '@containers/home/organisms/HomeCalendar';
import HomeLabelArea from '@containers/home/organisms/HomeLabelArea';
import HomeResultArea from '@containers/home/organisms/HomeResultArea';
import { getDatabase, ref, set } from 'firebase/database';

const Home = ({ navigation }: any) => {
  const { data: monthlyRecord, isError, isLoading } = useMonthlyRecord();
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