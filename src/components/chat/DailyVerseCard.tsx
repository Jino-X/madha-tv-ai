import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useDailyVerse } from '../../hooks/useDailyVerse';

interface DailyVerseCardProps {
  onPress?: () => void;
}

export function DailyVerseCard({ onPress }: DailyVerseCardProps) {
  const { colors } = useTheme();
  const { verse, reference, isLoading } = useDailyVerse();

  if (isLoading) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceAlt,
          borderLeftColor: colors.gold,
        },
      ]}
    >
      <Text style={[styles.quote, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
        "{verse}"
      </Text>
      <Text style={[styles.citation, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
        {reference.toUpperCase()} • DAILY BREAD
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.sm,
    padding: SPACING.base,
    borderLeftWidth: 3,
    borderRadius: RADIUS.md,
  },
  quote: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.relaxed,
    marginBottom: SPACING.sm,
  },
  citation: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.widest,
    textTransform: 'uppercase',
  },
});
