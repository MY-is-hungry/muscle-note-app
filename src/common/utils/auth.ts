import { signInWithCredential, updateEmail, updateProfile } from '@firebase/auth'
import type { AuthCredential } from '@firebase/auth'
import { firebaseAuth } from '@common/utils/firebase';
import { Alert } from 'react-native';
import { AUTH_ALERT, SIGN_OUT_ALEART } from '@common/constants/alert';

export const loginWithCredential = async (credential: AuthCredential, data?: any) => {
  const { user } = await signInWithCredential(firebaseAuth, credential)

  if (data?.email && !user.email) {
    await updateEmail(user, data.email)
  }

  if (data?.displayName && !user.displayName) {
    await updateProfile(user, { displayName: data.displayName })
  }

  return user
}

export const logout = async () => {
  try {
    await firebaseAuth?.signOut()
  } catch (error: any) {
    console.error(error)
    Alert.alert(SIGN_OUT_ALEART.title, SIGN_OUT_ALEART.msg)
  }
}