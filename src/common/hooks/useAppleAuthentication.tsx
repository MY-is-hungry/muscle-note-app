import { isAvailableAsync, AppleAuthenticationScope, signInAsync } from 'expo-apple-authentication'
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'
import { OAuthProvider } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Alert, Platform } from 'react-native'


const login = async () => {
  const state = Math.random().toString(36).substring(2, 15)
  const rawNonce = nonceGen(32)
  const requestedScopes = [AppleAuthenticationScope.FULL_NAME, AppleAuthenticationScope.EMAIL]

  try {
    // SHA256でノンスをハッシュ化
    const digestNonce = await digestStringAsync(CryptoDigestAlgorithm.SHA256, rawNonce)

    const appleCredential = await signInAsync({
      requestedScopes: requestedScopes,
      state: state,
      nonce: digestNonce,
    })

    console.log('Apple Sign In result: ', appleCredential)
    
    const { identityToken, email, fullName } = appleCredential

    if (!identityToken) {
      throw new Error('No identity token provided.')
    }

    const provider = new OAuthProvider('apple.com')

    provider.addScope('email')
    provider.addScope('fullName')

    // Firebase側に元のノンスを渡して検証
    const credential = provider.credential({
      idToken: identityToken,
      rawNonce,
    })

    const displayName = fullName ? `${fullName.givenName} ${fullName.familyName}` : undefined
    const data = { email, displayName }

    return [credential, data] as const
  } catch (error: any) {
    throw error
  }
}

// ランダム文字列（ノンス）を生成
const nonceGen = (length: number) => {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const useAppleAuthentication = () => {
  // falseならApple認証ボタンを表示しない
  const [isAuthenticationLoaded, setIsAuthenticationLoaded] = useState<boolean>(false)

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        // デバイスのOSがApple認証をサポートしているかチェック
        const available = await isAvailableAsync()

        setIsAuthenticationLoaded(available)
      } catch (error: any) {
        Alert.alert('Error', error?.message)
      }
    }

    if (Platform.OS === 'ios' && !isAuthenticationLoaded) {
      checkAvailability()
    }
  }, [])

  return [isAuthenticationLoaded, login] as const
}