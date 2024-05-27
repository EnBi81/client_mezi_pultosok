import { ColorPalettes } from '../colorPalettes';

export const useGlobalColorPalette = () => {
  const today = new Date();
  const colorPalettes = ColorPalettes;
  const colorPalette =
    colorPalettes[(today.getDate() * 31) % colorPalettes.length];

  return {
    colorPalette: colorPalette,
  };
};
