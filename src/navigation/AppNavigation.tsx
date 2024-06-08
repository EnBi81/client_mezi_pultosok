import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useLocale } from '../locale/hooks/useLocale';
import { useColorTheme } from '../hooks/useColorTheme';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { l } = useLocale();
  const { colors } = useColorTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: colors.background.fullContrast,
        },
      }}
    >
      <Stack.Navigator initialRouteName='Schedule'>
        <Stack.Screen
          name='Schedule'
          component={SchedulePage}
          options={{
            title: '',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name='Settings'
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
