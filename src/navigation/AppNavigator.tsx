import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ThemeSelectionScreen } from '../screens/ThemeSelectionScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { EditProfileScreen } from '../screens/settings/EditProfileScreen';
import { PrivacyScreen } from '../screens/settings/PrivacyScreen';
import { DailyVerseScreen } from '../screens/settings/DailyVerseScreen';
import { JournalPrivacyScreen } from '../screens/settings/JournalPrivacyScreen';
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
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="DailyVerse" component={DailyVerseScreen} />
          <Stack.Screen name="JournalPrivacy" component={JournalPrivacyScreen} />
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
