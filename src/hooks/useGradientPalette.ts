import { DarkColorPalettes, GolderPalettes, LightColorPalettes, SpecialPalettes } from '../utils/gradientColors';
import { useColorTheme } from './useColorTheme';
import tinycolor from 'tinycolor2';
import { ColorPalette } from '../interfaces/ColorPalette';

export const useGradientPalette = () => {
  const { isLightTheme, isGoldenTheme } = useColorTheme();

  let colorPalettes;
  if (isLightTheme) colorPalettes = LightColorPalettes;
  else if (isGoldenTheme) colorPalettes = GolderPalettes;
  else colorPalettes = DarkColorPalettes;

  const today = new Date();
  let colorPalette: ColorPalette;

  if (is(today).on(8, 20)) {
    colorPalette = SpecialPalettes.hungarianFlag;
  } else {
    const prime = 7919;
    const todayCode = (today.getMonth() + 1) * today.getDate();
    let colorPaletteNumber = (todayCode * prime) % colorPalettes.length;

    if (__DEV__) {
      //colorPaletteNumber = 14 % colorPalettes.length;
    }

    colorPalette = colorPalettes[colorPaletteNumber];
  }

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

function is(date: Date) {
  return {
    on: (month: number, day: number) => {
      return date.getMonth() + 1 === month && date.getDate() === day;
    },
  };
}
