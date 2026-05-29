import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

export function JournalPrivacyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [autoLock, setAutoLock] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [cloudBackup, setCloudBackup] = useState(true);
  const [shareEntries, setShareEntries] = useState(false);

  const handleExportJournal = () => {
    Alert.alert(
      'Export Journal',
      'Export all your journal entries as a PDF document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting...') },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Entries',
      'This will permanently delete all your journal entries. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Deleting...'),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Journal Privacy
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.headerCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
          <Ionicons name="journal" size={48} color={colors.crimson} />
          <Text style={[styles.headerCardTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Your Sacred Space
          </Text>
          <Text style={[styles.headerCardDesc, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            "Search me, O God, and know my heart" — Psalm 139:23
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          SECURITY
        </Text>

        <View style={[styles.settingCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                Auto-Lock Journal
              </Text>
              <Text style={[styles.settingDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                Require authentication after 5 minutes of inactivity
              </Text>
            </View>
            <Switch
              value={autoLock}
              onValueChange={setAutoLock}
              trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
              thumbColor={autoLock ? colors.crimson : colors.inkFaint}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                Biometric Lock
              </Text>
              <Text style={[styles.settingDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                Use Face ID or fingerprint to access journal
              </Text>
            </View>
            <Switch
              value={biometricLock}
              onValueChange={setBiometricLock}
              trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
              thumbColor={biometricLock ? colors.crimson : colors.inkFaint}
            />
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          BACKUP & SHARING
        </Text>

        <View style={[styles.settingCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                Cloud Backup
              </Text>
              <Text style={[styles.settingDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                Encrypted backup to your iCloud or Google Drive
              </Text>
            </View>
            <Switch
              value={cloudBackup}
              onValueChange={setCloudBackup}
              trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
              thumbColor={cloudBackup ? colors.crimson : colors.inkFaint}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                Share Entries
              </Text>
              <Text style={[styles.settingDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                Allow sharing individual entries with spiritual director
              </Text>
            </View>
            <Switch
              value={shareEntries}
              onValueChange={setShareEntries}
              trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
              thumbColor={shareEntries ? colors.crimson : colors.inkFaint}
            />
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          DATA MANAGEMENT
        </Text>

        <TouchableOpacity
          onPress={handleExportJournal}
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.divider }, SHADOWS.sm]}
        >
          <Ionicons name="download-outline" size={24} color={colors.crimson} />
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Export Journal
            </Text>
            <Text style={[styles.actionDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Download all entries as PDF
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteAll}
          style={[styles.actionButton, { backgroundColor: colors.surface, borderColor: colors.crimson }, SHADOWS.sm]}
        >
          <Ionicons name="trash-outline" size={24} color={colors.crimson} />
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Delete All Entries
            </Text>
            <Text style={[styles.actionDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Permanently remove all journal data
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.crimson} />
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="shield-checkmark" size={20} color={colors.gold} />
          <Text style={[styles.infoText, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
            All journal entries are encrypted end-to-end. Only you can read your spiritual reflections.
          </Text>
        </View>
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
  },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.base,
  },
  settingCard: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    gap: SPACING.base,
  },
  settingContent: { flex: 1 },
  settingTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  settingDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  divider: { height: 0.5, marginLeft: SPACING.base },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  actionDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
  },
  infoText: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
});
