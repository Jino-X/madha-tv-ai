import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING } from '../../theme/tokens';

interface ScriptureQuoteProps {
  text: string;
  reference: string;
}

export function ScriptureQuote({ text, reference }: ScriptureQuoteProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
        "{text}"
      </Text>
      <Text style={[styles.reference, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
        — {reference}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.base,
    alignItems: 'center',
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.relaxed,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  reference: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    textTransform: 'uppercase',
  },
});
