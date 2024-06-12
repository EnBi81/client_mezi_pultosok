import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useLocale } from '../hooks/useLocale';
import { useColorTheme } from '../hooks/useColorTheme';
import { AppRoutes } from './AppRoutes';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { l } = useLocale();
  const { colors } = useColorTheme();

  let initialRoute = AppRoutes.schedule;

  if (__DEV__) {
    //initialRoute = AppRoutes.settings;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: colors.background.fullContrast,
        },
      }}
    >
      <Stack.Navigator initialRouteName={initialRoute.name}>
        <Stack.Screen
          name={AppRoutes.schedule.name}
          component={SchedulePage}
          options={{
            title: '',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name={AppRoutes.settings.name}
          component={SettingsPage}
          options={{
            title: l.navigation.settingsPage.name,
            headerStyle: {
              backgroundColor: colors.background.component, // Set the background color here
            },
            headerTintColor: colors.text.main, // Set the title color here
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
