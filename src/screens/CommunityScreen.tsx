import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { notificationSuccess } from '../utils/haptics';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { AppHeader } from '../components/common/AppHeader';
import { AvatarCircle } from '../components/common/AvatarCircle';
import { useCommunityStore } from '../store/useCommunityStore';
import { useAuthStore } from '../store/useAuthStore';
import { PrayerRequest } from '../types';

function PrayerCard({ prayer, onPray }: { prayer: PrayerRequest; onPray: () => void }) {
  const { colors } = useTheme();
  const { user } = useAuthStore();
  const isOwn = user?.id === prayer.userId;

  return (
    <View
      style={[
        styles.prayerCard,
        { backgroundColor: colors.surface, borderLeftColor: isOwn ? colors.crimson : 'transparent' },
        SHADOWS.sm,
      ]}
    >
      <View style={styles.prayerHeader}>
        <AvatarCircle size={30} uri={prayer.avatarUrl} initials={prayer.userName.charAt(0)} />
        <Text style={[styles.prayerUser, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          {prayer.userName}
        </Text>
        <Text style={[styles.prayerTime, { color: colors.inkFaint }]}>
          {getTimeAgo(prayer.createdAt)}
        </Text>
      </View>

      <Text style={[styles.prayerContent, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
        {prayer.content}
      </Text>

      <View style={styles.prayerFooter}>
        <TouchableOpacity
          onPress={onPray}
          disabled={prayer.hasPrayed}
          style={[styles.prayButton, { backgroundColor: prayer.hasPrayed ? colors.crimsonMuted : colors.surfaceAlt }]}
        >
          <Text style={{ fontSize: 16 }}>🙏</Text>
          <Text style={[styles.prayCount, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            {prayer.prayCount}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.joinedText, { color: colors.inkFaint }]}>
          {prayer.prayCount > 0 ? `${prayer.prayCount} joined in prayer` : ''}
        </Text>
      </View>
    </View>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function CommunityScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { prayers, isLoading, activePrayingCount, fetchPrayers, pray } = useCommunityStore();
  const { profile } = useAuthStore();

  useEffect(() => {
    fetchPrayers();
  }, []);

  const handlePray = async (prayerId: string) => {
    notificationSuccess();
    await pray(prayerId);
  };

  const renderItem = ({ item }: { item: PrayerRequest }) => (
    <PrayerCard prayer={item} onPray={() => handlePray(item.id)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <AppHeader
        title="Prayer Community"
        rightIcon="people-outline"
        onAvatarPress={() => navigation.navigate('Settings')}
        avatarUrl={profile?.avatarUrl}
      />

      <View style={[styles.liveBanner, { backgroundColor: colors.crimsonMuted }]}>
        <View style={styles.liveDot} />
        <Text style={[styles.liveText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          Live — {activePrayingCount || 47} praying now
        </Text>
      </View>

      <FlatList
        data={prayers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={fetchPrayers}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={48} color={colors.inkFaint} />
            <Text style={[styles.emptyText, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
              Be the first to share a prayer
            </Text>
          </View>
        }
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.crimson }, SHADOWS.lg]}>
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  liveBanner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, marginHorizontal: SPACING.base, marginTop: SPACING.sm, borderRadius: RADIUS.full },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E74C3C', marginRight: SPACING.sm },
  liveText: { fontSize: TYPOGRAPHY.sizes.sm },
  listContent: { padding: SPACING.base, paddingBottom: 100 },
  prayerCard: { borderRadius: RADIUS.md, padding: SPACING.base, marginBottom: SPACING.base, borderLeftWidth: 3 },
  prayerHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
  prayerUser: { flex: 1, fontSize: TYPOGRAPHY.sizes.base },
  prayerTime: { fontSize: TYPOGRAPHY.sizes.sm },
  prayerContent: { fontSize: TYPOGRAPHY.sizes.base, lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.relaxed, marginBottom: SPACING.md },
  prayerFooter: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  prayButton: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  prayCount: { fontSize: TYPOGRAPHY.sizes.sm },
  joinedText: { fontSize: TYPOGRAPHY.sizes.sm },
  emptyState: { alignItems: 'center', paddingVertical: SPACING.xxxl },
  emptyText: { fontSize: TYPOGRAPHY.sizes.base, marginTop: SPACING.md },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
