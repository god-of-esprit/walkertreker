import { AsyncStorage } from "react-native";

export async function storeData(keyString, valueString) {
  try {
    await AsyncStorage.setItem(keyString, valueString);
  } catch (error) {
    console.log(`${keyString} data could not be saved - ${error}`);
  }
}
// eslint-disable-next-line consistent-return
export async function retrieveData(keyString) {
  try {
    const value = await AsyncStorage.getItem(keyString);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(`${keyString} data could not be retrieved - ${error}`);
  }
}
