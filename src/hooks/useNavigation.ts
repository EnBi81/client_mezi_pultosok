import { NavigationContext } from '@react-navigation/native';
import { useContext } from 'react';
import { AppRoutes } from '../navigation/AppRoutes';

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  return {
    navigate: {
      to: {
        settings: () => navigation.navigate(AppRoutes.settings.name),
      },
    },
  };
};
