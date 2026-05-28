import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY } from '../../theme/tokens';

interface AvatarCircleProps {
  size?: number;
  uri?: string;
  initials?: string;
  borderColor?: string;
  borderWidth?: number;
}

export function AvatarCircle({
  size = 36,
  uri,
  initials,
  borderColor,
  borderWidth = 0,
}: AvatarCircleProps) {
  const { colors } = useTheme();
  const displayInitials = initials || 'M';

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.crimsonMuted,
          borderColor: borderColor || colors.crimson,
          borderWidth,
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          contentFit="cover"
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              color: colors.crimson,
              fontSize: size * 0.4,
              fontFamily: TYPOGRAPHY.fonts.serifBold,
            },
          ]}
        >
          {displayInitials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
  },
});
