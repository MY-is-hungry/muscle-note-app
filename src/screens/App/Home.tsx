import { getDatabase, ref, set } from 'firebase/database';
import { firebaseAuth } from '@common/utils/firebase';
import HomeCalendar from '@containers/home/organisms/HomeCalendar';
import HomeLabelArea from '@containers/home/organisms/HomeLabelArea';
import HomeResultArea from '@containers/home/organisms/HomeResultArea';
import ScrollWrapper from '@components/layout/ScrollWrapper';

const Home = ({ navigation }: any) => {
  const testDB = () => {
    const db = getDatabase();
    // console.log('currentUser', firebaseAuth?.currentUser?.uid)
    const reference = ref(db, 'users/' + firebaseAuth?.currentUser?.uid);
    set(reference, {
      highscore: 'score',
    });
  }

  return (
    <ScrollWrapper>
      <HomeCalendar/>
      <HomeLabelArea/>
      <HomeResultArea/>
    </ScrollWrapper>
  )
}

export default Home;