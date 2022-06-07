import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { fetch } from '../../common/utils/axios';
import Header from '../../components/organisms/Header';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseAuth } from '@common/utils/firebase';
import { useNavigationState } from '@react-navigation/native';

const Home = ({ navigation }: any) => {
  const tailwind = useTailwind()

  const testDB = () => {
    const db = getDatabase();
    // console.log('currentUser', firebaseAuth?.currentUser?.uid)
    const reference = ref(db, 'users/' + firebaseAuth?.currentUser?.uid);
    set(reference, {
      highscore: 'score',
    });
  }

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-transparent px-6')}>
      <Text style={tailwind('text-white')}>Historyに飛べます！</Text>
      <Button title="History" onPress={() => navigation.navigate('History')}/>
      <Button title="DBTest" onPress={testDB}/>
    </View>
  )
}

export default Home;