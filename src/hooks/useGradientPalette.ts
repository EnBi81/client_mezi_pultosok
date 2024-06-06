import { DarkColorPalettes, LightColorPalettes } from '../colorPalettes';
import { useColorTheme } from './useColorTheme';

export const useGradientPalette = () => {
  const { isLightTheme } = useColorTheme();

  const colorPalettes = isLightTheme ? LightColorPalettes : DarkColorPalettes;

  const prime = 7919;
  const today = new Date();
  const todayCode = (today.getMonth() + 1) * today.getDate();

  let colorPaletteNumber = (todayCode * prime) % colorPalettes.length;

  if (__DEV__) {
    //colorPaletteNumber = 8 % colorPalettes.length;
  }

  const colorPalette = colorPalettes[colorPaletteNumber];

  return {
    colorPalette: colorPalette,
  };
};
