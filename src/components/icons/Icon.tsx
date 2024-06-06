import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorTheme } from '../../hooks/useColorTheme';

export const Icon = ({
  name,
  color,
  size = 20,
  provider = 'material',
}: {
  name: string;
  size?: number;
  color?: string;
  provider?: 'material' | 'material-community';
}) => {
  const { colors } = useColorTheme();

  if (!color) {
    color = colors.text.main;
  }

  if (provider === 'material')
    return <IconMaterial name={name} size={size} color={color} />;
  return <IconMaterialCommunity name={name} size={size} color={color} />;
};
