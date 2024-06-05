import { ColorPalette } from './interfaces/ColorPalette';

// https://colorffy.com/gradients

export const LightColorPalettes: ColorPalette[] = [
  {
    gradient: [
      '#B429F9',
      '#9C43F8',
      '#855DF7',
      '#6D77F6',
      '#5591F5',
      '#3EABF4',
      '#26C5F3',
    ],
    textColor: '#FFF',
  },
  {
    gradient: [
      '#FCF3C4',
      '#FCDBBE',
      '#FBC3B8',
      '#FBABB2',
      '#FA92AC',
      '#FA7AA6',
      '#F962A0',
    ],
    textColor: '#000',
  },
  {
    gradient: [
      '#EEB86D',
      '#E0A579',
      '#D29284',
      '#C47F90',
      '#B56C9B',
      '#A759A7',
      '#9946B2',
    ],
    textColor: '#fff',
  },
  {
    gradient: ['#48226C', '#8200E7', '#BF3EFF'],
    textColor: '#fff',
  },
  {
    gradient: ['#ff3864', '#fc7995', '#ff99ad'],
    textColor: '#000',
  },
  {
    gradient: ['#ff3e00', '#ffc72c'],
    textColor: '#000',
  },
  {
    gradient: ['#e05a8b', '#e06c5a', '#e0af5a'],
    textColor: '#fff',
  },
  {
    gradient: ['#08d11d', '#1b9616', '#077a05', '#044501'],
    textColor: '#fff',
  },
];

const DarkColorPalettes: ColorPalette[] = [
  {
    gradient: ['#001217', '#002027', '#002E36', '#003C45', '#004954'],
    textColor: '#ffffff',
  },
  {
    gradient: ['#341336', '#5e2a55', '#85406a', '#ad5778'],
    textColor: '#fff',
  },
];

// just leaving them here, because they are nice, though they dont make that
// good of a contrast
const deprecatedColorPalettes: ColorPalette[] = [
  {
    gradient: [
      '#E9B7CE',
      '#E5C1D4',
      '#E2CBDA',
      '#DED5E0',
      '#DADFE5',
      '#D7E9EB',
      '#D3F3F1',
    ],
    textColor: '#000',
  },
  {
    gradient: [
      '#EEB86D',
      '#E0A579',
      '#D29284',
      '#C47F90',
      '#B56C9B',
      '#A759A7',
      '#9946B2',
    ],
    textColor: '#ffffff',
  },
  {
    gradient: [
      '#AED1EF',
      '#B9D3E7',
      '#C5D6E0',
      '#D0D8D8',
      '#DBDAD0',
      '#E7DDC9',
      '#F2DFC1',
    ],
    textColor: '#000',
  },
];
