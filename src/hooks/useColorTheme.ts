import { useColorScheme } from 'react-native';
import { useSettings } from '../settings/hooks/useSettings';

export const useColorTheme = () => {
  const { settings } = useSettings();
  const theme = useColorScheme();

  const isLightTheme = theme !== 'dark';

  return {
    // use light theme when theme == 'light' or null
    isLightTheme: isLightTheme,
    colorThemeSettings: settings.colorTheme,
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
    page: '#000000',
    component: '#1e1e1e',
    fullContrast: '#000',
  },
  card: {
    bg: '#171717',
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
