import { LightColorPalettes } from '../colorPalettes';

export const useGlobalColorPalette = () => {
  const today = new Date();
  const colorPalettes = LightColorPalettes;
  const prime = 7919;

  let colorPaletteNumber = (today.getDate() * prime) % colorPalettes.length;

  if (__DEV__) {
    //colorPaletteNumber = 8 % colorPalettes.length;
  }

  const colorPalette = colorPalettes[colorPaletteNumber];

  return {
    colorPalette: colorPalette,
  };
};
