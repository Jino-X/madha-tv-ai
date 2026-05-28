import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING } from '../theme/tokens';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { transcribeAudio } from '../api/whisper';
import { DEFAULT_VERSES } from '../constants/defaultVerses';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function VoiceScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { startRecording, stopRecording, isRecording, amplitude } = useVoiceRecorder();
  const [transcript, setTranscript] = useState('');
  const [currentVerse, setCurrentVerse] = useState(0);
  const [statusText, setStatusText] = useState('TAP TO BEGIN YOUR PRAYER...');

  const ring3Scale = useSharedValue(1);
  const ring2Scale = useSharedValue(1);
  const ring1Scale = useSharedValue(1);
  const statusOpacity = useSharedValue(1);

  useEffect(() => {
    ring3Scale.value = withRepeat(
      withSequence(withTiming(1.4, { duration: 2500 }), withTiming(1, { duration: 2500 })),
      -1
    );
    ring2Scale.value = withRepeat(
      withDelay(300, withSequence(withTiming(1.3, { duration: 2000 }), withTiming(1, { duration: 2000 }))),
      -1
    );
    ring1Scale.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 1500 }), withTiming(0.95, { duration: 1500 })),
      -1
    );
    statusOpacity.value = withRepeat(
      withSequence(withTiming(0.3, { duration: 1200 }), withTiming(1, { duration: 1200 })),
      -1
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((v) => (v + 1) % DEFAULT_VERSES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const statusAnimatedStyle = useAnimatedStyle(() => ({
    opacity: isRecording ? statusOpacity.value : 1,
  }));

  const handleToggleRecording = useCallback(async () => {
    if (isRecording) {
      setStatusText('PROCESSING YOUR PRAYER...');
      const uri = await stopRecording();
      if (uri) {
        try {
          const text = await transcribeAudio(uri);
          setTranscript(text);
          setStatusText('PRAYER RECEIVED');
        } catch {
          setStatusText('TAP TO BEGIN YOUR PRAYER...');
        }
      }
    } else {
      setTranscript('');
      setStatusText('I AM LISTENING TO YOUR PRAYER...');
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.center}>
        <Animated.Text style={[styles.statusText, { color: colors.inkFaint }, statusAnimatedStyle]}>
          {statusText}
        </Animated.Text>

        <View style={styles.auraContainer}>
          <Svg width={300} height={300} viewBox="0 0 300 300">
            <Circle cx={150} cy={150} r={140} stroke={colors.gold} strokeWidth={1} fill="none" opacity={0.06 + amplitude * 0.19} />
            <Circle cx={150} cy={150} r={110} stroke={colors.gold} strokeWidth={1} fill="none" opacity={0.1} />
            <Circle cx={150} cy={150} r={80} fill={colors.gold} opacity={0.08} />
            <Circle cx={150} cy={150} r={50} fill={colors.gold} opacity={0.2} />
            <Circle cx={150} cy={150} r={24} fill={colors.gold} opacity={0.85} />
          </Svg>
        </View>

        <Text style={[styles.verseText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
          "{DEFAULT_VERSES[currentVerse].text}"
        </Text>

        {transcript ? (
          <View style={[styles.transcriptBubble, { backgroundColor: colors.surfaceAlt }]}>
            <Text style={[styles.transcriptText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifRegular }]}>
              {transcript}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.controlButton}>
          <Ionicons name="close" size={20} color={colors.inkLight} />
          <Text style={[styles.controlLabel, { color: colors.inkLight }]}>CLOSE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleRecording}
          style={[styles.recordButton, { backgroundColor: colors.crimson }]}
        >
          <Ionicons name={isRecording ? 'pause' : 'mic'} size={28} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.controlButton}>
          <Ionicons name="keypad-outline" size={20} color={colors.inkLight} />
          <Text style={[styles.controlLabel, { color: colors.inkLight }]}>TYPE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: SPACING.xl,
  },
  auraContainer: {
    marginVertical: SPACING.xl,
  },
  verseText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: TYPOGRAPHY.sizes.lg * TYPOGRAPHY.lineHeights.relaxed,
    marginTop: SPACING.xl,
  },
  transcriptBubble: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    maxWidth: '90%',
  },
  transcriptText: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.normal,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    paddingBottom: SPACING.xxl,
  },
  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabel: {
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1,
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
