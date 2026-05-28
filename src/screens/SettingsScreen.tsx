import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { AvatarCircle } from '../components/common/AvatarCircle';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

interface SettingsRowProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isDestructive?: boolean;
}

function SettingsRow({ icon, label, subtitle, onPress, rightElement, isDestructive }: SettingsRowProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsRow} activeOpacity={0.6}>
      <Ionicons name={icon as any} size={20} color={isDestructive ? colors.crimson : colors.inkLight} />
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, { color: isDestructive ? colors.crimson : colors.ink, fontFamily: TYPOGRAPHY.fonts.sansMedium }]}>
          {label}
        </Text>
        {subtitle && (
          <Text style={[styles.rowSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />}
    </TouchableOpacity>
  );
}

function SectionLabel({ title }: { title: string }) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
      {title}
    </Text>
  );
}

export function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { profile, signOut } = useAuthStore();
  const { currentTheme } = useThemeStore();

  const themeNames: Record<string, string> = {
    'sacred-light': 'Sacred Light',
    'midnight-vigil': 'Midnight Vigil',
    'emerald-grace': 'Emerald Grace',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <AvatarCircle size={88} uri={profile?.avatarUrl} borderColor={colors.crimson} borderWidth={2.5} />
          <Text style={[styles.profileName, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            {profile?.displayName || 'Dear Friend'}
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.crimson }]}>
            <Text style={[styles.badgeText, { color: colors.white, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              ✦ Active Believer • {profile?.streak || 0} Day Streak
            </Text>
          </View>
        </View>

        <SectionLabel title="ACCOUNT" />
        <View style={[styles.section, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <SettingsRow icon="person-circle-outline" label="Edit Profile" onPress={() => {}} />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="card-outline" label="Subscription Plan" rightElement={
            <View style={[styles.premiumBadge, { backgroundColor: colors.goldMuted }]}>
              <Text style={[styles.premiumText, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                {profile?.subscriptionTier === 'premium' ? 'Premium' : 'Free'}
              </Text>
            </View>
          } />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="lock-closed-outline" label="Privacy" />
        </View>

        <SectionLabel title="EXPERIENCE" />
        <View style={[styles.section, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <SettingsRow
            icon="color-palette-outline"
            label="Theme Selection"
            subtitle={`Current: ${themeNames[currentTheme]}`}
            onPress={() => navigation.navigate('ThemeSelection')}
          />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="globe-outline" label="Language" subtitle={profile?.language === 'tamil' ? 'Tamil' : 'English'} />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow
            icon="notifications-outline"
            label="Notification Preferences"
            onPress={() => navigation.navigate('Notifications')}
            rightElement={<Switch value={true} trackColor={{ true: colors.crimson, false: colors.divider }} />}
          />
        </View>

        <SectionLabel title="SPIRITUAL" />
        <View style={[styles.section, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <SettingsRow icon="time-outline" label="Prayer Reminders" onPress={() => navigation.navigate('Notifications')} />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="book-outline" label="Daily Verse Delivery" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="shield-outline" label="Journal Privacy" />
        </View>

        <SectionLabel title="SUPPORT" />
        <View style={[styles.section, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <SettingsRow icon="information-circle-outline" label="About Madha TV" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="help-circle-outline" label="Help Center" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="star-outline" label="Rate the App" />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <SettingsRow icon="log-out-outline" label="Sign Out" isDestructive onPress={signOut} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.base, borderBottomWidth: 0.5 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.md },
  scrollContent: { paddingBottom: 40 },
  profileSection: { alignItems: 'center', paddingVertical: SPACING.xl },
  profileName: { fontSize: TYPOGRAPHY.sizes.xl, marginTop: SPACING.md },
  badge: { marginTop: SPACING.sm, paddingHorizontal: 14, paddingVertical: 6, borderRadius: RADIUS.full },
  badgeText: { fontSize: TYPOGRAPHY.sizes.sm, color: '#fff' },
  sectionLabel: { fontSize: TYPOGRAPHY.sizes.xs, letterSpacing: 2, textTransform: 'uppercase', marginTop: SPACING.xl, marginBottom: SPACING.sm, marginLeft: SPACING.base },
  section: { marginHorizontal: SPACING.base, borderRadius: RADIUS.md, overflow: 'hidden' },
  settingsRow: { flexDirection: 'row', alignItems: 'center', height: 54, paddingHorizontal: SPACING.base, gap: SPACING.md },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: TYPOGRAPHY.sizes.base },
  rowSubtitle: { fontSize: TYPOGRAPHY.sizes.sm, marginTop: 2 },
  divider: { height: 0.5, marginLeft: 48 },
  premiumBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full },
  premiumText: { fontSize: TYPOGRAPHY.sizes.sm },
});
