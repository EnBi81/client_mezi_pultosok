import { LightColorPalettes } from '../colorPalettes';

export const useGlobalColorPalette = () => {
  const today = new Date();
  const colorPalettes = LightColorPalettes;
  const prime = 136614254054256523129288861637; // large enough to be pseudo random

  let colorPaletteNumber = (today.getDate() * prime) % colorPalettes.length;

  if (__DEV__) {
    //colorPaletteNumber = 8 % colorPalettes.length;
  }

  const colorPalette = colorPalettes[colorPaletteNumber];

  return {
    colorPalette: colorPalette,
  };
};
