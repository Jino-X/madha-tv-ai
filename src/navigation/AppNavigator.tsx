import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ThemeSelectionScreen } from '../screens/ThemeSelectionScreen';
import { AboutScreen } from '../screens/settings/AboutScreen';
import { HelpCenterScreen } from '../screens/settings/HelpCenterScreen';
import { RateAppScreen } from '../screens/settings/RateAppScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { user, isGuest } = useAuthStore();
  const isAuthenticated = !!user || isGuest;

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          <Stack.Screen name="RateApp" component={RateAppScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
