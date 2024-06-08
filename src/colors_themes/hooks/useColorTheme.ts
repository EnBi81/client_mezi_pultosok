import { useColorScheme } from 'react-native';
import { useSettings } from '../../settings/hooks/useSettings';
import { useSunPosition } from './useSunPosition';

export const useColorTheme = () => {
  const { settings } = useSettings();
  const { nextSunEvent } = useSunPosition();
  const theme = useColorScheme();

  let isLightTheme = theme !== 'dark';
  let isGoldenTheme = nextSunEvent?.type === 'golden-hour-end-morning' || nextSunEvent?.type === 'sunset';

  if (__DEV__) {
    //isLightTheme = false;
    //isGoldenTheme = true;
  }

  return {
    // use light theme when theme == 'light' or null
    isLightTheme: isLightTheme,
    isGoldenTheme: isGoldenTheme,
    colorThemeSettings: settings.colorThemeProps.type,
    colors: isLightTheme ? lightTheme : darkTheme,
  };
};

interface ColorTheme {
  text: {
    main: string;
    secondary: string;
  };
  background: {
    page: string;
    component: string;
    fullContrast: string;
    settings: string;
  };
  card: {
    bg: string;
    shadow: string;
    separatorLine: string;
  };
  effect: {
    ripple: string;
    skeleton: {
      light: string;
      dark: string;
    };
  };
}

const lightTheme: ColorTheme = {
  text: {
    main: '#000',
    secondary: '#333',
  },
  background: {
    page: '#fff',
    component: '#fff',
    fullContrast: '#fff',
    settings: '#fff',
  },
  card: {
    bg: '#fff',
    shadow: '#000',
    separatorLine: '#d0d0d0',
  },
  effect: {
    ripple: '#ccc',
    skeleton: {
      light: '#cbcbcb',
      dark: '#f5f5f5',
    },
  },
};

const darkTheme: ColorTheme = {
  text: {
    main: '#fff',
    secondary: '#ddd',
  },
  background: {
    page: '#131313',
    component: '#2d2d2d',
    fullContrast: '#000',
    settings: '#111',
  },
  card: {
    bg: '#3b3b3b',
    shadow: '#aaa',
    separatorLine: '#696969',
  },
  effect: {
    ripple: '#555',
    skeleton: {
      light: '#555',
      dark: '#000',
    },
  },
};
