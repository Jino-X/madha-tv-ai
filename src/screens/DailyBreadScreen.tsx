import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { AppHeader } from '../components/common/AppHeader';
import { OrnamentalDivider } from '../components/common/OrnamentalDivider';
import { useGospelReading } from '../hooks/useGospelReading';
import { useAuthStore } from '../store/useAuthStore';

export function DailyBreadScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { passage, reference, isLoading } = useGospelReading();
  const { profile } = useAuthStore();
  const [bookmarked, setBookmarked] = useState(false);

  const renderDropCap = () => {
    if (!passage) return null;
    const firstLetter = passage.charAt(0);
    const restText = passage.slice(1);

    return (
      <View style={styles.dropCapContainer}>
        <Text style={[styles.dropCapLetter, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          {firstLetter}
        </Text>
        <Text style={[styles.passageText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifRegular }]}>
          {restText}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <AppHeader
        rightIcon="search-outline"
        onAvatarPress={() => navigation.navigate('Settings')}
        avatarUrl={profile?.avatarUrl}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={[colors.crimsonDark, colors.crimson]}
            style={styles.heroGradient}
          >
            <View style={styles.heroOverlay}>
              <Ionicons name="book-outline" size={48} color="rgba(255,255,255,0.3)" />
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => setBookmarked(!bookmarked)}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={[styles.gospelLabel, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            THE HOLY GOSPEL
          </Text>
          <Text style={[styles.reference, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            {reference || 'Matthew 5:1-12'}
          </Text>

          {isLoading ? (
            <Text style={[styles.loadingText, { color: colors.inkFaint }]}>Loading scripture...</Text>
          ) : (
            renderDropCap()
          )}

          <OrnamentalDivider />

          <TouchableOpacity style={[styles.reflectButton, { backgroundColor: colors.crimson }]}>
            <Text style={[styles.reflectButtonText, { color: colors.white, fontFamily: TYPOGRAPHY.fonts.serifSemiBold }]}>
              ✦ REFLECT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: colors.surfaceAlt, borderColor: colors.crimson }]}
          >
            <Text style={[styles.shareButtonText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifSemiBold }]}>
              ↑ SHARE PRAYER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 240,
    position: 'relative',
  },
  heroGradient: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  content: {
    padding: SPACING.base,
  },
  gospelLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginTop: SPACING.base,
  },
  reference: {
    fontSize: TYPOGRAPHY.sizes.display,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  dropCapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropCapLetter: {
    fontSize: 56,
    lineHeight: 50,
    marginRight: 4,
    marginTop: 4,
  },
  passageText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.base + 1,
    lineHeight: (TYPOGRAPHY.sizes.base + 1) * TYPOGRAPHY.lineHeights.spacious,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'center',
    paddingVertical: SPACING.xxl,
  },
  reflectButton: {
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    ...SHADOWS.sm,
  },
  reflectButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
  },
  shareButton: {
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    borderWidth: 1,
  },
  shareButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
  },
});
