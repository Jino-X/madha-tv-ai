import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { SPACING } from '../../theme/tokens';

export function TypingIndicator() {
  const { colors } = useTheme();

  const createDotStyle = (delay: number) =>
    useAnimatedStyle(() => ({
      transform: [
        {
          translateY: withRepeat(
            withDelay(
              delay,
              withSequence(
                withTiming(-6, { duration: 300 }),
                withTiming(0, { duration: 300 })
              )
            ),
            -1
          ),
        },
      ],
    }));

  const dot1Style = createDotStyle(0);
  const dot2Style = createDotStyle(150);
  const dot3Style = createDotStyle(300);

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, { backgroundColor: colors.crimson }, dot1Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: colors.crimson }, dot2Style]} />
        <Animated.View style={[styles.dot, { backgroundColor: colors.crimson }, dot3Style]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
