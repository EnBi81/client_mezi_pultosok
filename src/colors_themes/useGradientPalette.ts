import { DarkColorPalettes, LightColorPalettes } from './gradientColors';
import { useColorTheme } from './useColorTheme';
import tinycolor from 'tinycolor2';

export const useGradientPalette = () => {
  const { isLightTheme } = useColorTheme();

  const colorPalettes = isLightTheme ? LightColorPalettes : DarkColorPalettes;

  const prime = 7919;
  const today = new Date();
  const todayCode = (today.getMonth() + 1) * today.getDate();

  let colorPaletteNumber = (todayCode * prime) % colorPalettes.length;

  if (__DEV__) {
    //colorPaletteNumber = 14 % colorPalettes.length;
  }

  const colorPalette = colorPalettes[colorPaletteNumber];

  return {
    colorPalette: colorPalette,
    gradientEffects: {
      brighten: (by: number) =>
        applyEffectToArrayColors(colorPalette.gradient, (hex) => tinycolor(hex).brighten(by).toString()),
    },
  };
};

const applyEffectToArrayColors = (colors: string[], effect: (string) => string) => {
  return colors.map((c) => effect(c));
};
