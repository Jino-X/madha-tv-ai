import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '2026.05.29';

export function AboutScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          About
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoSection}>
          <View style={[styles.logoCircle, { backgroundColor: colors.crimson }]}>
            <Text style={styles.logoText}>🙏</Text>
          </View>
          <Text style={[styles.appName, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Madha TV AI
          </Text>
          <Text style={[styles.tagline, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Your Catholic Spiritual Companion
          </Text>
          <View style={[styles.versionBadge, { backgroundColor: colors.goldMuted }]}>
            <Text style={[styles.versionText, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Version {APP_VERSION} ({BUILD_NUMBER})
            </Text>
          </View>
        </View>

        <View style={[styles.missionCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
          <Text style={[styles.missionTitle, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Our Mission
          </Text>
          <Text style={[styles.missionText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifRegular }]}>
            To accompany you on your spiritual journey with the wisdom of Catholic tradition, powered by compassionate AI guidance. We help you deepen your faith through daily Scripture, prayer, and reflection.
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          FEATURES
        </Text>

        <View style={[styles.featureCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="chatbubble-ellipses" size={24} color={colors.crimson} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              AI Spiritual Guidance
            </Text>
            <Text style={[styles.featureDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Chat with an AI trained in Catholic theology and spirituality
            </Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="book" size={24} color={colors.crimson} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Daily Gospel
            </Text>
            <Text style={[styles.featureDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Daily readings with reflections and spiritual insights
            </Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="journal" size={24} color={colors.crimson} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Spiritual Journal
            </Text>
            <Text style={[styles.featureDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Track your faith journey with private journal entries
            </Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="people" size={24} color={colors.crimson} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Prayer Community
            </Text>
            <Text style={[styles.featureDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Share and join in prayer with fellow believers
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          CONNECT WITH US
        </Text>

        <TouchableOpacity
          onPress={() => openLink('https://madhatv.com')}
          style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <Ionicons name="globe-outline" size={24} color={colors.crimson} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Visit Our Website
          </Text>
          <Ionicons name="open-outline" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('mailto:support@madhatv.com')}
          style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <Ionicons name="mail-outline" size={24} color={colors.crimson} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Contact Support
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('https://twitter.com/madhatv')}
          style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <Ionicons name="logo-twitter" size={24} color={colors.crimson} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Follow Us on Twitter
          </Text>
          <Ionicons name="open-outline" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          LEGAL
        </Text>

        <TouchableOpacity style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="document-text-outline" size={24} color={colors.inkLight} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Terms of Service
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="shield-outline" size={24} color={colors.inkLight} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Privacy Policy
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.linkCard, { backgroundColor: colors.surface }, SHADOWS.sm]}>
          <Ionicons name="code-outline" size={24} color={colors.inkLight} />
          <Text style={[styles.linkText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Open Source Licenses
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Made with ❤️ and 🙏 for the Catholic community
          </Text>
          <Text style={[styles.copyright, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
            © 2026 Madha TV. All rights reserved.
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
  logoSection: { alignItems: 'center', paddingVertical: SPACING.xl },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.base,
  },
  logoText: { fontSize: 48 },
  appName: { fontSize: TYPOGRAPHY.sizes.xxl, marginBottom: SPACING.xs },
  tagline: { fontSize: TYPOGRAPHY.sizes.base, textAlign: 'center', marginBottom: SPACING.base },
  versionBadge: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  versionText: { fontSize: TYPOGRAPHY.sizes.sm },
  missionCard: {
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginVertical: SPACING.xl,
  },
  missionTitle: { fontSize: TYPOGRAPHY.sizes.lg, marginBottom: SPACING.base },
  missionText: { fontSize: TYPOGRAPHY.sizes.base, lineHeight: 24 },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.base,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  featureDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  linkText: { flex: 1, fontSize: TYPOGRAPHY.sizes.base },
  footer: { alignItems: 'center', marginTop: SPACING.xxxl, paddingTop: SPACING.xl },
  footerText: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginBottom: SPACING.xs },
  copyright: { fontSize: TYPOGRAPHY.sizes.xs },
});
