declare module 'react-native-config' {
  export interface NativeConfig {
    APK_VERSION: string;
    API_ENDPOINT: string;
    IS_DEBUG_BY_DEFAULT: string;
    STORAGE_KEYS: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
