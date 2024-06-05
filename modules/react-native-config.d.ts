declare module 'react-native-config' {
  export interface NativeConfig {
    APK_VERSION: string;
    API_ENDPOINT: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
