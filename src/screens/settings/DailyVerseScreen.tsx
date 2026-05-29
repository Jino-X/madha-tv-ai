import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

const DELIVERY_TIMES = [
  { id: '6am', label: '6:00 AM', subtitle: 'Start your day with Scripture' },
  { id: '9am', label: '9:00 AM', subtitle: 'Morning devotion' },
  { id: '12pm', label: '12:00 PM', subtitle: 'Midday reflection' },
  { id: '6pm', label: '6:00 PM', subtitle: 'Evening prayer' },
  { id: '9pm', label: '9:00 PM', subtitle: 'Night contemplation' },
];

const VERSE_CATEGORIES = [
  { id: 'all', icon: 'book-outline', label: 'All Scripture', desc: 'Verses from the entire Bible' },
  { id: 'psalms', icon: 'musical-notes-outline', label: 'Psalms', desc: 'Songs of praise and lament' },
  { id: 'gospels', icon: 'heart-outline', label: 'Gospels', desc: 'Words of Jesus Christ' },
  { id: 'wisdom', icon: 'bulb-outline', label: 'Wisdom', desc: 'Proverbs and wisdom literature' },
  { id: 'epistles', icon: 'mail-outline', label: 'Epistles', desc: 'Letters from the Apostles' },
];

export function DailyVerseScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedTime, setSelectedTime] = useState('6am');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Daily Verse
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.previewCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
          <Text style={[styles.previewVerse, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope."
          </Text>
          <Text style={[styles.previewRef, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            — Jeremiah 29:11
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          DELIVERY TIME
        </Text>

        {DELIVERY_TIMES.map((time) => (
          <TouchableOpacity
            key={time.id}
            onPress={() => setSelectedTime(time.id)}
            style={[
              styles.timeCard,
              {
                backgroundColor: colors.surface,
                borderColor: selectedTime === time.id ? colors.crimson : colors.divider,
              },
              SHADOWS.sm,
            ]}
          >
            <View style={styles.timeContent}>
              <Text
                style={[
                  styles.timeLabel,
                  {
                    color: selectedTime === time.id ? colors.crimson : colors.ink,
                    fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                  },
                ]}
              >
                {time.label}
              </Text>
              <Text style={[styles.timeSubtitle, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                {time.subtitle}
              </Text>
            </View>
            {selectedTime === time.id && <Ionicons name="checkmark-circle" size={24} color={colors.crimson} />}
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          VERSE CATEGORY
        </Text>

        {VERSE_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[
              styles.categoryCard,
              {
                backgroundColor: colors.surface,
                borderColor: selectedCategory === category.id ? colors.crimson : colors.divider,
              },
              SHADOWS.sm,
            ]}
          >
            <View
              style={[
                styles.categoryIcon,
                {
                  backgroundColor: selectedCategory === category.id ? colors.crimsonMuted : colors.bgDeep,
                },
              ]}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={selectedCategory === category.id ? colors.crimson : colors.inkLight}
              />
            </View>
            <View style={styles.categoryContent}>
              <Text
                style={[
                  styles.categoryLabel,
                  {
                    color: selectedCategory === category.id ? colors.crimson : colors.ink,
                    fontFamily: TYPOGRAPHY.fonts.sansSemiBold,
                  },
                ]}
              >
                {category.label}
              </Text>
              <Text style={[styles.categoryDesc, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
                {category.desc}
              </Text>
            </View>
            {selectedCategory === category.id && <Ionicons name="checkmark-circle" size={24} color={colors.crimson} />}
          </TouchableOpacity>
        ))}

        <View style={[styles.infoBox, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="notifications-outline" size={20} color={colors.gold} />
          <Text style={[styles.infoText, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
            You'll receive a daily notification with a verse from your selected category at your chosen time.
          </Text>
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.crimson }, SHADOWS.md]}>
          <Text style={[styles.saveButtonText, { color: colors.white, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Save Preferences
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
  previewCard: {
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  previewVerse: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: SPACING.base,
  },
  previewRef: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center' },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.base,
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    marginBottom: SPACING.sm,
  },
  timeContent: { flex: 1 },
  timeLabel: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  timeSubtitle: { fontSize: TYPOGRAPHY.sizes.sm },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: { flex: 1 },
  categoryLabel: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: 2 },
  categoryDesc: { fontSize: TYPOGRAPHY.sizes.sm },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
  },
  infoText: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
  saveButton: {
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  saveButtonText: { fontSize: TYPOGRAPHY.sizes.base },
});
