import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'How does the AI spiritual guidance work?',
    answer: 'Our AI is trained on Catholic Catechism, Sacred Scripture, writings of the Saints, and Papal documents. It provides guidance rooted in authentic Catholic teaching while maintaining a warm, pastoral tone.',
  },
  {
    question: 'Is my journal private?',
    answer: 'Yes, absolutely. All journal entries are encrypted end-to-end and stored securely. Only you can access your spiritual reflections. We never share your personal data with third parties.',
  },
  {
    question: 'How do I change my daily verse delivery time?',
    answer: 'Go to Settings → Daily Verse Delivery and select your preferred time. You can also choose which category of Scripture you\'d like to receive.',
  },
  {
    question: 'Can I use the app offline?',
    answer: 'Some features like viewing your journal and saved prayers work offline. However, AI chat, daily Gospel, and community features require an internet connection.',
  },
  {
    question: 'How do prayer requests work?',
    answer: 'You can submit prayer requests that are shared with the community (public) or kept private. Public prayers allow others to join you in prayer, building a supportive faith community.',
  },
  {
    question: 'What is the streak feature?',
    answer: 'Your streak tracks consecutive days of engagement with the app through prayer, reading Scripture, or journaling. It helps build consistent spiritual habits.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'Go to Settings → Privacy & Security → Delete All My Data. This will permanently remove all your data. Please note this action cannot be undone.',
  },
  {
    question: 'Is there a premium subscription?',
    answer: 'Currently, all features are free. We may introduce premium features in the future, but core spiritual guidance will always remain accessible to everyone.',
  },
];

function FAQCard({ faq, isExpanded, onToggle }: { faq: FAQItem; isExpanded: boolean; onToggle: () => void }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.faqCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
    >
      <View style={styles.faqHeader}>
        <Text style={[styles.faqQuestion, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          {faq.question}
        </Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.crimson}
        />
      </View>
      {isExpanded && (
        <Text style={[styles.faqAnswer, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
          {faq.answer}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function HelpCenterScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Help Center
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.welcomeCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
          <Ionicons name="help-circle" size={48} color={colors.crimson} />
          <Text style={[styles.welcomeTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            How Can We Help?
          </Text>
          <Text style={[styles.welcomeDesc, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Find answers to common questions or reach out to our support team
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          QUICK ACTIONS
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:support@madhatv.com')}
          style={[styles.actionCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.crimsonMuted }]}>
            <Ionicons name="mail" size={24} color={colors.crimson} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Email Support
            </Text>
            <Text style={[styles.actionDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Get help from our team
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://madhatv.com/tutorials')}
          style={[styles.actionCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.goldMuted }]}>
            <Ionicons name="play-circle" size={24} color={colors.gold} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Video Tutorials
            </Text>
            <Text style={[styles.actionDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Watch how-to guides
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://madhatv.com/community')}
          style={[styles.actionCard, { backgroundColor: colors.surface }, SHADOWS.sm]}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.crimsonMuted }]}>
            <Ionicons name="people" size={24} color={colors.crimson} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Community Forum
            </Text>
            <Text style={[styles.actionDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Ask the community
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inkFaint} />
        </TouchableOpacity>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          FREQUENTLY ASKED QUESTIONS
        </Text>

        {FAQ_DATA.map((faq, index) => (
          <FAQCard
            key={index}
            faq={faq}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}

        <View style={[styles.contactCard, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="chatbubbles" size={24} color={colors.gold} />
          <View style={styles.contactContent}>
            <Text style={[styles.contactTitle, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Still Need Help?
            </Text>
            <Text style={[styles.contactDesc, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Our support team is here for you. Email us at support@madhatv.com and we'll respond within 24 hours.
            </Text>
          </View>
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
  welcomeCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  welcomeTitle: { fontSize: TYPOGRAPHY.sizes.lg, marginTop: SPACING.base },
  welcomeDesc: {
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
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  actionDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  faqCard: {
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.base,
  },
  faqQuestion: { flex: 1, fontSize: TYPOGRAPHY.sizes.base },
  faqAnswer: {
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: 20,
    marginTop: SPACING.base,
    paddingTop: SPACING.base,
  },
  contactCard: {
    flexDirection: 'row',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
    gap: SPACING.base,
  },
  contactContent: { flex: 1 },
  contactTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: SPACING.xs },
  contactDesc: { fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
});
