import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { AppHeader } from '../components/common/AppHeader';
import { OrnamentalDivider } from '../components/common/OrnamentalDivider';
import { AddJournalModal } from '../components/journey/AddJournalModal';
import { useJourneyStore } from '../store/useJourneyStore';
import { useAuthStore } from '../store/useAuthStore';

function StatCard({ value, label, icon }: { value: string; label: string; icon: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.statCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
      <Ionicons name={icon as any} size={40} color={colors.crimsonMuted} style={styles.statBgIcon} />
      <Text style={[styles.statValue, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
        {label}
      </Text>
    </View>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const { colors } = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.progressSection}>
      <View style={styles.progressHeader}>
        <Text style={[styles.progressLabel, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          Monthly Bible Goal
        </Text>
        <Text style={[styles.progressPercent, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          {progress}%
        </Text>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: colors.bgDeep }]}>
        <Animated.View style={[styles.progressFill, { backgroundColor: colors.crimson }, animatedStyle]} />
      </View>
    </View>
  );
}

export function JourneyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { entries, stats, fetchEntries, refreshStats, addEntry } = useJourneyStore();
  const { profile } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchEntries();
    refreshStats();
  }, []);

  const goalPercent = stats.bibleGoalTarget > 0
    ? Math.round((stats.bibleGoalCurrent / stats.bibleGoalTarget) * 100)
    : 0;

  const handleAddEntry = async (entry: any) => {
    await addEntry(entry);
    await fetchEntries();
    await refreshStats();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <AppHeader
        rightIcon="filter-outline"
        onAvatarPress={() => navigation.navigate('Settings')}
        avatarUrl={profile?.avatarUrl}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Your Spiritual Chronicle
          </Text>
          <Text style={[styles.subtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            "Your word is a lamp to my feet and a light to my path."
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard value={String(stats.dayStreak)} label="DAY STREAK" icon="flame-outline" />
          <StatCard value={stats.versesRead > 999 ? `${(stats.versesRead / 1000).toFixed(1)}k` : String(stats.versesRead)} label="VERSES READ" icon="book-outline" />
          <StatCard value={String(stats.prayersSent)} label="PRAYERS SENT" icon="heart-outline" />
          <StatCard value={String(stats.insights)} label="INSIGHTS" icon="bulb-outline" />
        </View>

        <ProgressBar progress={goalPercent || 75} />

        <View style={styles.chroniclesHeader}>
          <Text style={[styles.chroniclesTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Chronicles of Faith
          </Text>
          <OrnamentalDivider />
        </View>

        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="journal-outline" size={48} color={colors.inkFaint} />
            <Text style={[styles.emptyText, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
              Begin your spiritual chronicle today
            </Text>
          </View>
        ) : (
          entries.slice(0, 5).map((entry) => (
            <View
              key={entry.id}
              style={[
                styles.entryCard,
                {
                  backgroundColor: colors.surface,
                  borderLeftColor: entry.entryType === 'prayer' ? colors.gold : colors.crimson,
                },
                SHADOWS.sm,
              ]}
            >
              <Text style={[styles.entryTime, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                {new Date(entry.createdAt).toLocaleDateString()}
              </Text>
              <Text style={[styles.entryTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
                {entry.title}
              </Text>
              <Text
                numberOfLines={3}
                style={[styles.entryBody, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifRegular }]}
              >
                {entry.body}
              </Text>
              <View style={styles.entryTags}>
                {entry.tags.map((tag) => (
                  <View key={tag} style={[styles.tag, { backgroundColor: colors.crimsonMuted }]}>
                    <Text style={[styles.tagText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.crimson }, SHADOWS.lg]}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>

      <AddJournalModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: { alignItems: 'center', paddingVertical: SPACING.xl, paddingHorizontal: SPACING.xxl },
  title: { fontSize: TYPOGRAPHY.sizes.xxl, textAlign: 'center' },
  subtitle: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginTop: SPACING.sm, paddingHorizontal: SPACING.xxl },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: SPACING.base },
  statCard: { width: '47%', borderRadius: RADIUS.md, padding: SPACING.base, position: 'relative', overflow: 'hidden' },
  statBgIcon: { position: 'absolute', right: 8, top: 8, opacity: 0.06 },
  statValue: { fontSize: TYPOGRAPHY.sizes.display },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, letterSpacing: 2, textTransform: 'uppercase', marginTop: SPACING.xs },
  progressSection: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.xl },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  progressLabel: { fontSize: TYPOGRAPHY.sizes.sm },
  progressPercent: { fontSize: TYPOGRAPHY.sizes.sm },
  progressTrack: { height: 8, borderRadius: RADIUS.full, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: RADIUS.full },
  chroniclesHeader: { paddingHorizontal: SPACING.base, paddingTop: SPACING.xl },
  chroniclesTitle: { fontSize: TYPOGRAPHY.sizes.xl },
  emptyState: { alignItems: 'center', paddingVertical: SPACING.xxxl },
  emptyText: { fontSize: TYPOGRAPHY.sizes.base, marginTop: SPACING.md },
  entryCard: { marginHorizontal: SPACING.base, marginTop: SPACING.base, borderRadius: RADIUS.md, padding: SPACING.base, borderLeftWidth: 4 },
  entryTime: { fontSize: TYPOGRAPHY.sizes.sm, marginBottom: SPACING.xs },
  entryTitle: { fontSize: TYPOGRAPHY.sizes.md, marginBottom: SPACING.sm },
  entryBody: { fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
  entryTags: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full },
  tagText: { fontSize: TYPOGRAPHY.sizes.sm },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
