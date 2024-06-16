import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulePage } from '../pages/SchedulePage';
import { SettingsPage } from '../pages/SettingsPage';
import { useLocale } from '../hooks/useLocale';
import { useColorTheme } from '../hooks/useColorTheme';
import { AppRoutes } from './AppRoutes';
import { WhatsNewPage } from '../pages/WhatsNewPage';
import { Text, TouchableOpacity, View } from 'react-native';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { l } = useLocale();
  const { colors } = useColorTheme();

  let initialRoute = AppRoutes.schedule;

  if (__DEV__) {
    initialRoute = AppRoutes.settings;
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
            headerRight: () => <SettingsHeaderRight />,
          }}
        />
        <Stack.Screen
          name={AppRoutes.whatsNew.name}
          component={WhatsNewPage}
          options={{
            title: l.navigation.whatsNewPage.name,
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

function SettingsHeaderRight() {
  const navigation = useNavigation();
  const { colors } = useColorTheme();
  const { l } = useLocale();

  return (
    <View style={{ marginRight: 15 }}>
      <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.whatsNew.name)}>
        <Text style={{ color: colors.text.main, textDecorationLine: 'underline' }}>
          {l.navigation.whatsNewPage.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
