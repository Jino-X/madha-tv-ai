import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

interface PrivacyToggleProps {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function PrivacyToggle({ icon, title, description, value, onValueChange }: PrivacyToggleProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.toggleRow, { backgroundColor: colors.surface }, SHADOWS.sm]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.crimsonMuted }]}>
        <Ionicons name={icon as any} size={20} color={colors.crimson} />
      </View>
      <View style={styles.toggleContent}>
        <Text style={[styles.toggleTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          {title}
        </Text>
        <Text style={[styles.toggleDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
        thumbColor={value ? colors.crimson : colors.inkFaint}
      />
    </View>
  );
}

export function PrivacyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [profileVisibility, setProfileVisibility] = useState(false);
  const [prayerHistory, setPrayerHistory] = useState(true);
  const [journalPrivate, setJournalPrivate] = useState(true);
  const [activityStatus, setActivityStatus] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Privacy & Security
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.headerCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="shield-checkmark" size={48} color={colors.crimson} />
          <Text style={[styles.headerCardTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Your Privacy Matters
          </Text>
          <Text style={[styles.headerCardDesc, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Control what you share and how your data is used
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          PROFILE PRIVACY
        </Text>

        <PrivacyToggle
          icon="people-outline"
          title="Public Profile"
          description="Allow others in the community to see your profile"
          value={profileVisibility}
          onValueChange={setProfileVisibility}
        />

        <PrivacyToggle
          icon="eye-outline"
          title="Show Activity Status"
          description="Let others see when you're active in prayer"
          value={activityStatus}
          onValueChange={setActivityStatus}
        />

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          SPIRITUAL DATA
        </Text>

        <PrivacyToggle
          icon="book-outline"
          title="Private Journal"
          description="Keep all journal entries completely private"
          value={journalPrivate}
          onValueChange={setJournalPrivate}
        />

        <PrivacyToggle
          icon="heart-outline"
          title="Prayer History"
          description="Save your prayer history for personal reflection"
          value={prayerHistory}
          onValueChange={setPrayerHistory}
        />

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          DATA & ANALYTICS
        </Text>

        <PrivacyToggle
          icon="analytics-outline"
          title="Usage Analytics"
          description="Help us improve by sharing anonymous usage data"
          value={dataCollection}
          onValueChange={setDataCollection}
        />

        <View style={[styles.infoCard, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="lock-closed" size={24} color={colors.gold} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              End-to-End Encryption
            </Text>
            <Text style={[styles.infoDesc, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Your prayers, journal entries, and personal data are encrypted and secure. We never share your spiritual journey with third parties.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.dangerButton, { borderColor: colors.crimson }]}>
          <Ionicons name="trash-outline" size={20} color={colors.crimson} />
          <Text style={[styles.dangerText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Delete All My Data
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.md },
  scrollContent: { padding: SPACING.base, paddingBottom: 40 },
  headerCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  headerCardTitle: { fontSize: TYPOGRAPHY.sizes.lg, marginTop: SPACING.base },
  headerCardDesc: {
    fontSize: TYPOGRAPHY.sizes.sm,
    textAlign: 'center',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.base,
  },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.base,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.base,
    gap: SPACING.base,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContent: { flex: 1 },
  toggleTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  toggleDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  infoCard: {
    flexDirection: 'row',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
    gap: SPACING.base,
  },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: SPACING.xs },
  infoDesc: { fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    marginTop: SPACING.xl,
  },
  dangerText: { fontSize: TYPOGRAPHY.sizes.base },
});
