import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useChatStore } from '../../store/useChatStore';

const SOURCES = ['Vatican News', 'English', 'தமிழ்', 'Bible Gateway', 'USCCB'];

export function SacredSourcesBar() {
  const { colors } = useTheme();
  const { activeSources, toggleSource } = useChatStore();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.divider }]}>
      <Text style={[styles.label, { color: colors.inkFaint }]}>SACRED SOURCES</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {SOURCES.map((source) => {
          const isActive = activeSources.includes(source);
          return (
            <TouchableOpacity
              key={source}
              onPress={() => toggleSource(source)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? colors.crimsonMuted : colors.surfaceAlt,
                  borderColor: isActive ? colors.crimson : colors.gold,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isActive ? colors.crimson : colors.inkMedium,
                    fontFamily: TYPOGRAPHY.fonts.sansMedium,
                  },
                ]}
              >
                {source}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.base,
    borderTopWidth: 0.5,
  },
  label: {
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  chips: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 0.5,
  },
  chipText: {
    fontSize: TYPOGRAPHY.sizes.sm,
  },
});
