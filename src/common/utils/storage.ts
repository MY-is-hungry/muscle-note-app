import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key: string, value: string | number) => {
  try {
    const stringValue = JSON.stringify(value);
    AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.log(error);
  }
}

export const loadStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.log(error)
  }
}
