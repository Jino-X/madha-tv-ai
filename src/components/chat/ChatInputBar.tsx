import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { impactMedium } from '../../utils/haptics';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

interface ChatInputBarProps {
  onSend: (text: string) => void;
  onMicPress?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInputBar({ onSend, onMicPress, placeholder, disabled }: ChatInputBarProps) {
  const { colors } = useTheme();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    impactMedium();
    onSend(text.trim());
    setText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.divider }, SHADOWS.sm]}>
        <TouchableOpacity style={styles.iconButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="add" size={24} color={colors.inkLight} />
        </TouchableOpacity>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.ink,
              fontFamily: TYPOGRAPHY.fonts.serifRegular,
              backgroundColor: colors.surfaceAlt,
            },
          ]}
          value={text}
          onChangeText={setText}
          placeholder={placeholder || 'What would you like to explore?'}
          placeholderTextColor={colors.inkFaint}
          multiline
          maxLength={2000}
          editable={!disabled}
        />

        {onMicPress && !text.trim() && (
          <TouchableOpacity onPress={onMicPress} style={styles.iconButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="mic-outline" size={22} color={colors.inkLight} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleSend}
          disabled={!text.trim() || disabled}
          style={[
            styles.sendButton,
            {
              backgroundColor: text.trim() && !disabled ? colors.crimson : colors.divider,
            },
          ]}
        >
          <Ionicons name="arrow-up" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 0.5,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.base,
    maxHeight: 100,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.xl,
    lineHeight: 20,
  },
  iconButton: {
    padding: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
