import React from 'react';
import './notifications/PushNotificationsConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from './pages/SchedulePage';
import { SettingsPage } from './pages/SettingsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
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
}
