import { ColorPalette } from '../interfaces/ColorPalette';

// https://colorffy.com/gradients

export const LightColorPalettes: ColorPalette[] = [
  {
    // ChatGPT name: Cosmic Spectrum
    gradientName: 'Cosmic Spectrum',
    gradient: ['#B429F9', '#9C43F8', '#855DF7', '#6D77F6', '#5591F5', '#3EABF4', '#26C5F3'],
    textColor: '#FFF',
  },
  {
    // ChatGPT name: Sunset Blush
    gradientName: 'Sunset Blush',
    gradient: ['#FCF3C4', '#FCDBBE', '#FBC3B8', '#FBABB2', '#FA92AC', '#FA7AA6', '#F962A0'],
    textColor: '#000',
  },
  {
    // ChatGPT name: Autumn Falling
    gradientName: 'Autumn Falling',
    gradient: ['#EEB86D', '#E0A579', '#D29284', '#C47F90', '#B56C9B', '#A759A7', '#9946B2'],
    textColor: '#fff',
  },
  {
    // Amethyst
    gradientName: 'Amethyst',
    gradient: ['#48226C', '#8200E7', '#BF3EFF'],
    textColor: '#fff',
  },
  {
    // Glow
    gradientName: 'Glow',
    gradient: ['#ff3864', '#fc7995', '#ff99ad'],
    textColor: '#000',
  },
  {
    // Lucky Dragon
    gradientName: 'Lucky Dragon',
    gradient: ['#ff3e00', '#ffc72c'],
    textColor: '#000',
  },
  {
    // Orange
    gradientName: 'Orange',
    gradient: ['#e05a8b', '#e06c5a', '#e0af5a'],
    textColor: '#fff',
  },
  {
    // Life
    gradientName: 'Life',
    gradient: ['#08d11d', '#1b9616', '#077a05', '#044501'],
    textColor: '#fff',
  },
  {
    // Vibes (reverse)
    gradientName: 'Vibes',
    gradient: ['#FF5E9D', '#FF7B80', '#FF9863', '#FFB547', '#FFD12A'],
    textColor: '#000',
  },
  {
    // Loyalty
    gradientName: 'Loyalty',
    gradient: ['#0f0c9c', '#f141fa', '#ffe9a6'],
    textColor: '#000',
  },
  {
    // Twilight
    gradientName: 'Twilight',
    gradient: ['#f97281', '#7b589e', '#171f85'],
    textColor: '#fff',
  },
  {
    // Bravery
    gradientName: 'Bravery',
    gradient: ['#E20B8C', '#F84B00'],
    textColor: '#fff',
  },
  {
    // Firestone
    gradientName: 'Firestone',
    gradient: ['#ffc107', '#e11b54', '#260000'],
    textColor: '#fff',
  },
  {
    // Honeycomb
    gradientName: 'Honeycomb',
    gradient: [
      '#c98762',
      '#d08a5f',
      '#d68d5b',
      '#dc9057',
      '#e29453',
      '#e9974e',
      '#ee9b47',
      '#f49f40',
      '#f9a337',
      '#fea72c',
    ],
    textColor: '#000',
  },
  {
    // Sunset 80s
    gradientName: 'Sunset 80s',
    gradient: ['#f52c8a', '#dd00ff', '#6a00ff'],
    textColor: '#fff',
  },
];

export const DarkColorPalettes: ColorPalette[] = [
  {
    // Night Lights
    gradientName: 'Night Lights',
    gradient: ['#001217', '#002027', '#002E36', '#003C45', '#004954'],
    textColor: '#ffffff',
  },
  {
    // Midnight Berry
    gradientName: 'Midnight Berry',
    gradient: ['#341336', '#5e2a55', '#85406a', '#ad5778'],
    textColor: '#fff',
  },
  {
    // Cosmos
    gradientName: 'Cosmos',
    gradient: ['#070070', '#300045'],
    textColor: '#fff',
  },
  {
    // Midnight
    gradientName: 'Midnight',
    gradient: ['#1c2052', '#410e6b', '#502570'],
    textColor: '#fff',
  },
  {
    // Grapes
    gradientName: 'Grapes',
    gradient: ['#36042c', '#4c1d43', '#712a63'],
    textColor: '#fff',
  },
  {
    // Night Indigo
    gradientName: 'Night Indigo',
    gradient: ['#300194', '#82037e', '#9c3502'],
    textColor: '#fff',
  },
  {
    // Wine
    gradientName: 'Wine',
    gradient: ['#33152c', '#1e0f19'],
    textColor: '#fff',
  },
  {
    // Lighting Bolt
    gradientName: 'Lighting Bolt',
    gradient: ['#03045E', '#023E8A', '#0077B6'],
    textColor: '#fff',
  },
  {
    // Scarlett
    gradientName: 'Scarlett',
    gradient: ['#5c0000', '#450505', '#260000'],
    textColor: '#fff',
  },
  {
    // Night
    gradientName: 'Night',
    gradient: ['#061d45', '#33085e'],
    textColor: '#fff',
  },
  {
    // Wine
    gradientName: 'Wine',
    gradient: ['#1b0b0d', '#2c1217', '#3f161e', '#531926'],
    textColor: '#fff',
  },
  {
    // Navy Blue
    gradientName: 'Navy Blue',
    gradient: ['#050939', '#131c80'],
    textColor: '#fff',
  },
  {
    // Twilight (excluding bright colors)
    gradientName: 'Twilight',
    gradient: ['#56437c', '#331f51', '#140029'],
    textColor: '#fff',
  },
  {
    // Infinity (excluding bright colors)
    gradientName: 'Infinity',
    gradient: ['#2e048d', '#1d0459', '#0c032b'],
    textColor: '#fff',
  },
];

export const GolderPalettes: ColorPalette[] = [
  {
    // Gold
    gradientName: 'Gold',
    gradient: ['#eba73c', '#d69122', '#bf7600'],
    textColor: '#fff',
  },
  {
    // Golden
    gradientName: 'Golden',
    gradient: ['#9e4e31', '#ff9800', '#ffc107'],
    textColor: '#fff',
  },
];

export const SpecialPalettes: { hungarianFlag: ColorPalette } = {
  hungarianFlag: {
    gradientName: 'Hungary',
    gradient: ['#cf2436', '#fff', '#45714f'],
    textColor: '#000',
  },
};

// just leaving them here, because they are nice, though they dont make that
// good of a contrast
/*const deprecatedColorPalettes: ColorPalette[] = [
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
];*/
