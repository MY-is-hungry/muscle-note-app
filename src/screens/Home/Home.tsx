import { useRecords } from '@common/hooks/useRecord';
import { firebaseAuth } from '@common/utils/firebase';
import ScrollWrapper from '@components/layout/ScrollWrapper';
import StartTrainingButton from '@containers/home/atoms/StartTrainingButton';
import HomeCalendar from '@containers/home/organisms/HomeCalendar';
import HomeLabelArea from '@containers/home/organisms/HomeLabelArea';
import HomeResultArea from '@containers/home/organisms/HomeResultArea';
import { getDatabase, ref, set } from 'firebase/database';

const Home = ({ navigation }: any) => {
  const { data: monthlyData, isError, isLoading } = useRecords('monthly')
  console.log(monthlyData)

  const testDB = () => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + firebaseAuth?.currentUser?.uid);
    set(reference, {
      highscore: 'score',
    });
  }

  return (
    <ScrollWrapper>
      <HomeCalendar monthlyRecord={monthlyData?.data || []} navigation={navigation}/>
      <HomeLabelArea totalDate={monthlyData?.daysCount} totalVolume={monthlyData?.volume}/>
      <StartTrainingButton/>
      <HomeResultArea totalDate={monthlyData?.daysCount} totalVolume={monthlyData?.volume}/>
    </ScrollWrapper>
  )
}

export default Home;