import { signInWithCredential, updateEmail, updateProfile } from '@firebase/auth'
import type { AuthCredential } from '@firebase/auth'
import { firebaseAuth } from '@common/utils/firebase';

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