import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Schedule'>
        <Stack.Screen
          name='Schedule'
          component={SchedulePage}
          options={{
            title: '',
            headerTransparent: true,
          }}
        />
        <Stack.Screen name='Settings' component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
