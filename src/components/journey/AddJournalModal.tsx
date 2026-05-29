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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';
import { NewJournalEntry } from '../../types';

interface AddJournalModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (entry: NewJournalEntry) => Promise<void>;
}

const ENTRY_TYPES = [
  { value: 'prayer', label: 'Prayer', icon: 'heart-outline' },
  { value: 'devotion', label: 'Devotion', icon: 'flame-outline' },
  { value: 'insight', label: 'Insight', icon: 'bulb-outline' },
  { value: 'verse', label: 'Verse', icon: 'book-outline' },
  { value: 'petition', label: 'Petition', icon: 'hand-right-outline' },
] as const;

const SUGGESTED_TAGS = [
  'Prayer', 'Gratitude', 'Scripture', 'Reflection', 
  'Worship', 'Meditation', 'Confession', 'Praise',
  'Intercession', 'Thanksgiving', 'Petition', 'Adoration'
];

export function AddJournalModal({ visible, onClose, onSubmit }: AddJournalModalProps) {
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [entryType, setEntryType] = useState<'devotion' | 'prayer' | 'insight' | 'verse' | 'petition'>('devotion');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        body: body.trim(),
        entryType,
        tags: selectedTags,
      });
      
      // Reset form
      setTitle('');
      setBody('');
      setEntryType('devotion');
      setSelectedTags([]);
      onClose();
    } catch (error) {
      console.error('Failed to add journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
            New Chronicle
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!title.trim() || !body.trim() || isSubmitting}
            style={styles.headerButton}
          >
            <Text
              style={[
                styles.saveText,
                {
                  color: !title.trim() || !body.trim() ? colors.inkFaint : colors.crimson,
                  fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                },
              ]}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Entry Type Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Entry Type
            </Text>
            <View style={styles.typeGrid}>
              {ENTRY_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => setEntryType(type.value)}
                  style={[
                    styles.typeCard,
                    {
                      backgroundColor: entryType === type.value ? colors.crimsonMuted : colors.surface,
                      borderColor: entryType === type.value ? colors.crimson : colors.divider,
                    },
                    SHADOWS.sm,
                  ]}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={24}
                    color={entryType === type.value ? colors.crimson : colors.inkFaint}
                  />
                  <Text
                    style={[
                      styles.typeLabel,
                      {
                        color: entryType === type.value ? colors.crimson : colors.inkMedium,
                        fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Title
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Give your entry a meaningful title..."
              placeholderTextColor={colors.inkFaint}
              style={[
                styles.titleInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.ink,
                  fontFamily: TYPOGRAPHY.fonts.serifBold,
                  borderColor: colors.divider,
                },
              ]}
            />
          </View>

          {/* Body Input */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Your Reflection
            </Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Pour out your heart... Share your thoughts, prayers, and reflections."
              placeholderTextColor={colors.inkFaint}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
              style={[
                styles.bodyInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.ink,
                  fontFamily: TYPOGRAPHY.fonts.serifRegular,
                  borderColor: colors.divider,
                },
              ]}
            />
          </View>

          {/* Tags Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Tags (Optional)
            </Text>
            <View style={styles.tagsContainer}>
              {SUGGESTED_TAGS.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tagChip,
                    {
                      backgroundColor: selectedTags.includes(tag) ? colors.crimson : colors.surface,
                      borderColor: selectedTags.includes(tag) ? colors.crimson : colors.divider,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagChipText,
                      {
                        color: selectedTags.includes(tag) ? colors.white : colors.inkMedium,
                        fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                      },
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
    width: 60,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
  },
  saveText: {
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.base,
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
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '47%',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  typeLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.lg,
  },
  bodyInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.base,
    minHeight: 200,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  tagChipText: {
    fontSize: TYPOGRAPHY.sizes.xs,
  },
  bottomPadding: {
    height: 40,
  },
});
