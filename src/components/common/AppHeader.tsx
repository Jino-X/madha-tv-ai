import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING } from '../../theme/tokens';
import { AvatarCircle } from './AvatarCircle';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onAvatarPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  avatarUrl?: string;
}

export function AppHeader({
  title = 'Ask Madha',
  showBackButton = false,
  onBack,
  onAvatarPress,
  rightIcon,
  onRightPress,
  avatarUrl,
}: AppHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.divider }]}>
      <View style={styles.left}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </TouchableOpacity>
        ) : (
          <View style={[styles.appIcon, { backgroundColor: colors.crimsonMuted }]}>
            <Ionicons name="flame" size={18} color={colors.crimson} />
          </View>
        )}
        <Text style={[styles.title, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name={rightIcon} size={22} color={colors.inkLight} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onAvatarPress}>
          <AvatarCircle size={36} uri={avatarUrl} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  appIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.md,
  },
  backButton: {
    marginRight: SPACING.sm,
  },
  iconButton: {
    padding: SPACING.xs,
  },
});
