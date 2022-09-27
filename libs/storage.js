import AsyncStorage from '@react-native-async-storage/async-storage';

export const wirte = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      alert("Error Write to storage:",e)
    }
  }

export const read = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    alert("Error Read to storage:",e)
  }
}