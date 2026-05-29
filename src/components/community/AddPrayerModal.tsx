import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

interface AddPrayerModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string, isPublic: boolean) => Promise<void>;
}

const PRAYER_PROMPTS = [
  'Share what\'s on your heart...',
  'What do you need prayer for today?',
  'Pour out your petitions to the Lord...',
  'What burden can we lift together in prayer?',
  'How can the community pray for you?',
];

const SUGGESTED_INTENTIONS = [
  { icon: '❤️', label: 'Health & Healing' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family' },
  { icon: '💼', label: 'Work & Career' },
  { icon: '🎓', label: 'Studies' },
  { icon: '💑', label: 'Relationships' },
  { icon: '🏠', label: 'Home & Safety' },
  { icon: '✝️', label: 'Spiritual Growth' },
  { icon: '🌍', label: 'World Peace' },
];

export function AddPrayerModal({ visible, onClose, onSubmit }: AddPrayerModalProps) {
  const { colors } = useTheme();
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrompt] = useState(
    PRAYER_PROMPTS[Math.floor(Math.random() * PRAYER_PROMPTS.length)]
  );

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), isPublic);
      
      // Reset form
      setContent('');
      setIsPublic(true);
      onClose();
    } catch (error) {
      console.error('Failed to submit prayer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertIntention = (intention: string) => {
    setContent(prev => prev ? `${prev}\n\n${intention}` : intention);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.bg }]}
      >
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.divider }]}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color={colors.ink} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Prayer Request
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            style={styles.headerButton}
          >
            <Text
              style={[
                styles.submitText,
                {
                  color: !content.trim() ? colors.inkFaint : colors.crimson,
                  fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                },
              ]}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Prayer Icon Header */}
          <View style={styles.iconHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.crimsonMuted }]}>
              <Text style={styles.prayerEmoji}>🙏</Text>
            </View>
            <Text style={[styles.subtitle, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
              "The prayer of a righteous person is powerful and effective."
            </Text>
            <Text style={[styles.reference, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              — James 5:16
            </Text>
          </View>

          {/* Prayer Content Input */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Your Prayer Request
            </Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder={selectedPrompt}
              placeholderTextColor={colors.inkFaint}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              style={[
                styles.prayerInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.ink,
                  fontFamily: TYPOGRAPHY.fonts.serifRegular,
                  borderColor: colors.divider,
                },
              ]}
            />
            <Text style={[styles.charCount, { color: colors.inkFaint }]}>
              {content.length} characters
            </Text>
          </View>

          {/* Quick Intentions */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Quick Intentions
            </Text>
            <View style={styles.intentionsGrid}>
              {SUGGESTED_INTENTIONS.map((intention) => (
                <TouchableOpacity
                  key={intention.label}
                  onPress={() => insertIntention(intention.label)}
                  style={[
                    styles.intentionCard,
                    { backgroundColor: colors.surface, borderColor: colors.divider },
                    SHADOWS.sm,
                  ]}
                >
                  <Text style={styles.intentionIcon}>{intention.icon}</Text>
                  <Text
                    style={[
                      styles.intentionLabel,
                      { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold },
                    ]}
                  >
                    {intention.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Privacy Toggle */}
          <View style={styles.section}>
            <View style={[styles.privacyCard, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
              <View style={styles.privacyHeader}>
                <Ionicons
                  name={isPublic ? 'people' : 'lock-closed'}
                  size={24}
                  color={colors.crimson}
                />
                <View style={styles.privacyText}>
                  <Text style={[styles.privacyTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
                    {isPublic ? 'Public Prayer' : 'Private Prayer'}
                  </Text>
                  <Text style={[styles.privacyDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                    {isPublic
                      ? 'Share with the community for collective prayer'
                      : 'Keep this prayer between you and God'}
                  </Text>
                </View>
                <Switch
                  value={isPublic}
                  onValueChange={setIsPublic}
                  trackColor={{ false: colors.divider, true: colors.crimsonMuted }}
                  thumbColor={isPublic ? colors.crimson : colors.inkFaint}
                />
              </View>
            </View>
          </View>

          {/* Info Box */}
          <View style={[styles.infoBox, { backgroundColor: colors.goldMuted }]}>
            <Ionicons name="information-circle" size={20} color={colors.gold} />
            <Text style={[styles.infoText, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Your prayer will be handled with care and respect. Public prayers help build our community of faith.
            </Text>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 70,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
  },
  submitText: {
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.base,
  },
  iconHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.base,
  },
  prayerEmoji: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'center',
    paddingHorizontal: SPACING.xxl,
    marginBottom: SPACING.xs,
  },
  reference: {
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: SPACING.sm,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  prayerInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.base,
    minHeight: 150,
    lineHeight: 24,
  },
  charCount: {
    fontSize: TYPOGRAPHY.sizes.xs,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  intentionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  intentionCard: {
    width: '47%',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  intentionIcon: {
    fontSize: 28,
  },
  intentionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    textAlign: 'center',
  },
  privacyCard: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.base,
  },
  privacyText: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    marginBottom: 2,
  },
  privacyDesc: {
    fontSize: TYPOGRAPHY.sizes.xs,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
  },
  infoText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});
