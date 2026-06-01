import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useChatStore } from '../../store/useChatStore';

const LANGUAGES = [
  { id: 'english' as const, label: 'English' },
  { id: 'tamil' as const, label: 'தமிழ்' },
];

export function LanguageSelector() {
  const { colors } = useTheme();
  const { selectedLanguage, setSelectedLanguage } = useChatStore();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.divider }]}>
      <Text style={[styles.label, { color: colors.inkFaint }]}>RESPONSE LANGUAGE</Text>
      <View style={styles.languageButtons}>
        {LANGUAGES.map((lang) => {
          const isActive = selectedLanguage === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              onPress={() => setSelectedLanguage(lang.id)}
              style={[
                styles.languageButton,
                {
                  backgroundColor: isActive ? colors.crimsonMuted : colors.surfaceAlt,
                  borderColor: isActive ? colors.crimson : colors.gold,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isActive ? colors.crimson : colors.inkMedium,
                    fontFamily: TYPOGRAPHY.fonts.sansMedium,
                  },
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  languageButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: '600',
  },
});
