import AsyncStorage from '@react-native-async-storage/async-storage';

export function LocalStorage<Type>({ key }: { key: string }) {
  const getDataJson = async (): Promise<Type | undefined> => {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue == null) return undefined;

    const jsonDto = JSON.parse(jsonValue);
    if (!('data' in jsonDto)) return undefined;

    return jsonDto.data;
  };

  const storeJsonData = async (value: Type) => {
    const jsonDto = {
      data: value,
    };
    const jsonValue = JSON.stringify(jsonDto);
    await AsyncStorage.setItem(key, jsonValue);
  };

  return {
    get: getDataJson,
    store: storeJsonData,
  };
}
