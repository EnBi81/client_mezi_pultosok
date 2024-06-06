import { useColorScheme } from 'react-native';
import { useSettings } from '../settings/hooks/useSettings';

export const useColorTheme = () => {
  const { settings } = useSettings();
  const theme = useColorScheme();

  return {
    // use light theme when theme == 'light' or null
    isLightTheme: theme !== 'dark',
    colorThemeSettings: settings.colorTheme,
  };
};
