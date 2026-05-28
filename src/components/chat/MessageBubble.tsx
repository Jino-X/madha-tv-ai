import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { Message } from '../../types';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { colors } = useTheme();
  const isUser = message.role === 'user';

  return (
    <Animated.View
      entering={isUser ? FadeInRight.duration(300).springify() : FadeInLeft.duration(300).springify()}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: colors.surfaceAlt }]
            : [styles.aiBubble, { backgroundColor: 'transparent' }],
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: colors.ink,
              fontFamily: TYPOGRAPHY.fonts.serifRegular,
            },
          ]}
        >
          {message.content}
        </Text>
        <Text style={[styles.timestamp, { color: colors.inkFaint }]}>
          {format(new Date(message.timestamp), 'h:mm a')}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.base,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: SPACING.md,
  },
  userBubble: {
    borderRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.xs,
  },
  aiBubble: {
    maxWidth: '100%',
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  timestamp: {
    fontSize: TYPOGRAPHY.sizes.xs,
    marginTop: SPACING.xs,
    alignSelf: 'flex-end',
  },
});
