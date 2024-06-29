declare module 'react-native-countries' {
  export interface NativeConfig {
    getCountryNamesWithCodes: Country[];
  }

  export const Config: NativeConfig;
  export default Config;
}

interface Country {
  code: string;
  name: string;
}
