import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

interface OrnamentalDividerProps {
  width?: number;
}

export function OrnamentalDivider({ width = 200 }: OrnamentalDividerProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Svg width={width} height={24} viewBox={`0 0 ${width} 24`}>
        <Line x1="0" y1="12" x2={width * 0.35} y2="12" stroke={colors.gold} strokeWidth="0.5" opacity={0.6} />
        <Circle cx={width * 0.42} cy={12} r={2} fill={colors.gold} opacity={0.8} />
        <Circle cx={width * 0.5} cy={12} r={3} fill={colors.gold} />
        <Circle cx={width * 0.58} cy={12} r={2} fill={colors.gold} opacity={0.8} />
        <Line x1={width * 0.65} y1="12" x2={width} y2="12" stroke={colors.gold} strokeWidth="0.5" opacity={0.6} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
