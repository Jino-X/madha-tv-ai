import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { selectionFeedback } from '../utils/haptics';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { OrnamentalDivider } from '../components/common/OrnamentalDivider';
import { useNotificationStore } from '../store/useNotificationStore';

function NotificationRow({
  title,
  subtitle,
  time,
  enabled,
  onToggle,
}: {
  title: string;
  subtitle: string;
  time?: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.notifRow, { backgroundColor: colors.surface }, SHADOWS.sm]}>
      <View style={styles.notifContent}>
        <Text style={[styles.notifTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          {title}
        </Text>
        <Text style={[styles.notifSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
          {subtitle}
        </Text>
        {time && (
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color={colors.inkFaint} />
            <Text style={[styles.timeText, { color: colors.inkFaint }]}>{time}</Text>
          </View>
        )}
      </View>
      <Switch
        value={enabled}
        onValueChange={() => {
          selectionFeedback();
          onToggle();
        }}
        trackColor={{ true: colors.crimson, false: colors.divider }}
      />
    </View>
  );
}

function TimeChip({ time }: { time: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.timeChip, { backgroundColor: colors.surfaceAlt }]}>
      <Text style={[styles.timeChipText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
        {time}
      </Text>
    </View>
  );
}

export function NotificationsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { settings, toggleSetting } = useNotificationStore();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Spiritual Discipline
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Refining your daily path to devotion through sacred reminders.
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>🍞 DAILY BREAD</Text>
        <NotificationRow
          title="Morning Gospel"
          subtitle="Start your day with scripture"
          time={settings.morningGospelTime + ' AM'}
          enabled={settings.morningGospel}
          onToggle={() => toggleSetting('morningGospel')}
        />
        <NotificationRow
          title="Evening Reflection"
          subtitle="End the day in prayer"
          time={settings.eveningReflectionTime + ' PM'}
          enabled={settings.eveningReflection}
          onToggle={() => toggleSetting('eveningReflection')}
        />

        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>🔥 PRAYER ALARMS</Text>
        <View style={[styles.notifRow, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <View style={styles.notifContent}>
            <Text style={[styles.notifTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>Angelus</Text>
            <Text style={[styles.notifSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>Triple daily bells</Text>
            <View style={styles.timeChipsRow}>
              {settings.angelusTimes.map((t) => <TimeChip key={t} time={t} />)}
            </View>
          </View>
          <Switch
            value={settings.angelus}
            onValueChange={() => toggleSetting('angelus')}
            trackColor={{ true: colors.crimson, false: colors.divider }}
          />
        </View>
        <View style={[styles.notifRow, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <View style={styles.notifContent}>
            <Text style={[styles.notifTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>Rosary</Text>
            <Text style={[styles.notifSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>Meditative prayer cycle</Text>
            <Text style={[styles.nextSet, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
              Next set: Glorious Mysteries
            </Text>
          </View>
          <Switch
            value={settings.rosary}
            onValueChange={() => toggleSetting('rosary')}
            trackColor={{ true: colors.crimson, false: colors.divider }}
          />
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>👥 COMMUNITY</Text>
        <NotificationRow
          title="Someone prayed for you"
          subtitle="Real-time intercession alerts"
          enabled={settings.communityIntercession}
          onToggle={() => toggleSetting('communityIntercession')}
        />
        <NotificationRow
          title="Community Prayer Request"
          subtitle="Lend your voice to the fellowship"
          enabled={settings.communityRequests}
          onToggle={() => toggleSetting('communityRequests')}
        />

        <Text style={[styles.sectionLabel, { color: colors.inkFaint }]}>📔 SPIRITUAL DIARY</Text>
        <NotificationRow
          title="Daily Reflection Prompt"
          subtitle="A gentle nudge to journal"
          enabled={settings.spiritualDiaryPrompt}
          onToggle={() => toggleSetting('spiritualDiaryPrompt')}
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            "Let your light so shine before men..."
          </Text>
          <OrnamentalDivider />
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
  hero: { alignItems: 'center', paddingVertical: SPACING.xl, paddingHorizontal: SPACING.xxl },
  heroTitle: { fontSize: TYPOGRAPHY.sizes.xxl, textAlign: 'center' },
  heroSubtitle: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginTop: SPACING.sm },
  sectionLabel: { fontSize: TYPOGRAPHY.sizes.xs, letterSpacing: 2, marginTop: SPACING.xl, marginBottom: SPACING.sm, marginLeft: SPACING.base, fontWeight: '600' },
  notifRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SPACING.base, marginBottom: SPACING.sm, padding: SPACING.base, borderRadius: RADIUS.md },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: TYPOGRAPHY.sizes.md },
  notifSubtitle: { fontSize: TYPOGRAPHY.sizes.sm, marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: SPACING.xs },
  timeText: { fontSize: TYPOGRAPHY.sizes.sm },
  timeChipsRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  timeChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full },
  timeChipText: { fontSize: TYPOGRAPHY.sizes.sm },
  nextSet: { fontSize: TYPOGRAPHY.sizes.sm, marginTop: SPACING.xs },
  footer: { alignItems: 'center', paddingVertical: SPACING.xxl },
  footerText: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginBottom: SPACING.md },
});
