import { DarkColorPalettes, GoldenPalettes, LightColorPalettes, SpecialPalettes } from '../utils/gradientColors';
import { useColorTheme } from './useColorTheme';
import tinycolor from 'tinycolor2';
import { ColorPalette } from '../interfaces/ColorPalette';

export const useGradientPalette = () => {
  const { isLightTheme, isGoldenTheme } = useColorTheme();

  let colorPalettes;
  if (isLightTheme) colorPalettes = LightColorPalettes;
  else if (isGoldenTheme) colorPalettes = GoldenPalettes;
  else colorPalettes = DarkColorPalettes;

  const today = new Date();
  let colorPalette: ColorPalette;

  if (is(today).on(8, 20)) {
    colorPalette = SpecialPalettes.hungarianFlag;
  } else {
    colorPalette = getGradientForDay(today, colorPalettes);
  }

  return {
    colorPalette: colorPalette,
    gradientEffects: {
      brighten: (by: number) =>
        applyEffectToArrayColors(colorPalette.gradient, (hex) => tinycolor(hex).brighten(by).toString()),
    },
    gradients: {
      light: LightColorPalettes,
      golden: GoldenPalettes,
      dark: DarkColorPalettes,
    },
    getGradientForDay: getGradientForDay,
  };
};

function getGradientForDay(date: Date, colorPalettes: ColorPalette[]): ColorPalette {
  const prime = 19391;
  const dateCode = 7 * date.getDate();
  let colorPaletteNumber = (dateCode * prime) % colorPalettes.length;

  if (__DEV__) {
    //colorPaletteNumber = 14 % colorPalettes.length;
  }

  return colorPalettes[colorPaletteNumber];
}

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
