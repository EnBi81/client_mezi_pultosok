import Config from 'react-native-config';

export const API_ENDPOINT = Config.API_ENDPOINT;
export const CURRENT_APK_VERSION = Config.APK_VERSION;
export const CHANGE_VISIBLE_FOR_MINUTES = 24 * 60;
export const IS_DEBUG_BY_DEFAULT = Config.IS_DEBUG_BY_DEFAULT === 'true';
export const STORAGE_KEYS = Config.STORAGE_KEYS === 'prod' ? 'production' : 'debug';
