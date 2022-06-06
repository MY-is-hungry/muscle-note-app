import { signInWithCredential, updateEmail, updateProfile } from '@firebase/auth'
import type { AuthCredential } from '@firebase/auth'
import { firebaseAuth } from '@common/utils/firebase';

export const loginWithCredential = async (credential: AuthCredential, data?: any) => {
  console.log('credential and data', credential, data)
  console.log('currentUser', firebaseAuth?.currentUser)

  const { user } = await signInWithCredential(firebaseAuth, credential)
  console.log('firebase User', user)

  if (data?.email && !user.email) {
    await updateEmail(user, data.email)
  }

  if (data?.displayName && !user.displayName) {
    await updateProfile(user, { displayName: data.displayName })
  }

  return user
}