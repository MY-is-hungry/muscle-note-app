import { signInWithCredential, updateEmail, updateProfile } from '@firebase/auth'
import type { AuthCredential } from '@firebase/auth'
import { firebaseAuth } from '@common/utils/firebase';
import { useSetRecoilState } from 'recoil';
import { initialCurrentUserId } from '@common/recoil/atoms';

export const loginWithCredential = async (credential: AuthCredential, data?: any) => {
  const setCurrentUserId = useSetRecoilState(initialCurrentUserId)
  console.log('credential and data', credential, data)
  console.log('currentUser', firebaseAuth?.currentUser)

  const { user } = await signInWithCredential(firebaseAuth, credential)
  console.log('firebase User', user)

  if (user?.uid) {
    setCurrentUserId(user.uid)
  }

  if (data?.email && !user.email) {
    await updateEmail(user, data.email)
  }

  if (data?.displayName && !user.displayName) {
    await updateProfile(user, { displayName: data.displayName })
  }

  return user
}