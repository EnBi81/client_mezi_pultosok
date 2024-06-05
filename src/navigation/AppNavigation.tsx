import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useLocale } from '../hooks/useLocale';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { l } = useLocale();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Settings'>
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
