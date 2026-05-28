import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, SHADOWS } from '../theme/tokens';
import { ChatScreen } from '../screens/ChatScreen';
import { DailyBreadScreen } from '../screens/DailyBreadScreen';
import { VoiceScreen } from '../screens/VoiceScreen';
import { JourneyScreen } from '../screens/JourneyScreen';
import { CommunityScreen } from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: 'Chat', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses' },
    { key: 'DailyBread', icon: 'book-outline', activeIcon: 'book' },
    { key: 'Voice', icon: 'mic-outline', activeIcon: 'mic' },
    { key: 'Journey', icon: 'map-outline', activeIcon: 'map' },
    { key: 'Community', icon: 'people-outline', activeIcon: 'people' },
  ];

  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.surface, borderTopColor: colors.divider }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const tab = tabs[index];
          const isVoice = tab.key === 'Voice';

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isVoice) {
            return (
              <TouchableOpacity key={route.key} onPress={onPress} style={styles.voiceButtonContainer}>
                <View style={[styles.voiceButton, { backgroundColor: colors.crimson }, SHADOWS.lg]}>
                  <Ionicons name={isFocused ? 'mic' : 'mic-outline'} size={28} color={colors.white} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
              <Ionicons
                name={(isFocused ? tab.activeIcon : tab.icon) as any}
                size={22}
                color={isFocused ? colors.crimson : colors.inkFaint}
              />
              {isFocused && <View style={[styles.activeIndicator, { backgroundColor: colors.crimson }]} />}
              <Text style={[styles.tabLabel, { color: isFocused ? colors.crimson : colors.inkFaint }]}>
                {tab.key === 'DailyBread' ? 'Bread' : tab.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="DailyBread" component={DailyBreadScreen} />
      <Tab.Screen name="Voice" component={VoiceScreen} />
      <Tab.Screen name="Journey" component={JourneyScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopWidth: Platform.OS === 'android' ? 0 : 0.5,
    ...Platform.select({
      android: { elevation: 8, shadowColor: '#000' },
      ios: {},
    }),
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'android' ? 64 : 60,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontFamily: TYPOGRAPHY.fonts.sansMedium,
  },
  activeIndicator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginTop: 2,
  },
  voiceButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
});
