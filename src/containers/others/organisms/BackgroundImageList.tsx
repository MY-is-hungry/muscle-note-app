import { BACKGROUND_IMAGE_LIST } from "@common/constants"
import { firebaseAuth } from "@common/utils/firebase";
import SelectLabel from "@components/atoms/SelectLabel"
import { child, get, getDatabase, onValue, ref, set, update } from 'firebase/database';
import { View } from "react-native";
import { useRecoilState } from 'recoil';
import { initialBgImage } from '@common/recoil/atoms';

const BackgroundImageList: React.FC = () => {
  const [bgImage, setBgImage] = useRecoilState(initialBgImage)
  const db = getDatabase()
  const reference = ref(db, `users/${firebaseAuth?.currentUser?.uid}`)

  const handleChangeBackgroundImage = (imageName: string) => {
    update(reference, { backgroundImage: imageName })
    setBgImage(imageName)
  }

  return (
    <View>
      { BACKGROUND_IMAGE_LIST.map ((image, index) => {
        return <SelectLabel key={index} name={image.displayName} onPressFn={() => handleChangeBackgroundImage(image.imageName)} isSelected={true} />
      })}
    </View>
  )
}
export default BackgroundImageList