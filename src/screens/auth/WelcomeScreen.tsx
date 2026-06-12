import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';

export function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { setGuest } = useAuthStore();

  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const scriptureOpacity = useSharedValue(0);
  const buttonsY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const floatY = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 15, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 600 });

    titleY.value = withDelay(400, withSpring(0, { damping: 15 }));
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));

    subtitleOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));
    scriptureOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));

    buttonsY.value = withDelay(1200, withSpring(0, { damping: 15 }));
    buttonsOpacity.value = withDelay(1200, withTiming(1, { duration: 500 }));

    floatY.value = withDelay(1500, withRepeat(
      withSequence(withTiming(-4, { duration: 2000 }), withTiming(4, { duration: 2000 })),
      -1
    ));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }, { translateY: floatY.value }],
    opacity: logoOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const scriptureStyle = useAnimatedStyle(() => ({ opacity: scriptureOpacity.value }));
  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsY.value }],
    opacity: buttonsOpacity.value,
  }));

  return (
    <LinearGradient colors={['#2C1810', '#8B1A1A']} style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <View style={styles.logoCircle}>
            <Ionicons name="flame" size={40} color="#C9A84C" />
          </View>
        </Animated.View>

        <Animated.View style={titleStyle}>
          <Text style={styles.appName}>Ask Madha</Text>
        </Animated.View>

        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Your Sacred Spiritual Companion
        </Animated.Text>

        <Animated.Text style={[styles.scripture, scriptureStyle]}>
          "I am the way, the truth, and the life." — John 14:6
        </Animated.Text>
      </View>

      <Animated.View style={[styles.buttons, { paddingBottom: insets.bottom + 20 }, buttonsStyle]}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => navigation.navigate('SignIn')}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setGuest(); }} activeOpacity={0.7}>
          <Text style={styles.guestLink}>Continue as Guest</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoContainer: { marginBottom: SPACING.xl },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(201,168,76,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(201,168,76,0.3)' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  appName: { fontFamily: TYPOGRAPHY.fonts.serifBold, fontSize: TYPOGRAPHY.sizes.hero, color: '#C9A84C' },
  aiBadge: { backgroundColor: '#8B1A1A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.full, borderWidth: 1, borderColor: 'rgba(201,168,76,0.4)' },
  aiBadgeText: { fontFamily: TYPOGRAPHY.fonts.sansSemiBold, fontSize: TYPOGRAPHY.sizes.sm, color: '#C9A84C' },
  subtitle: { fontFamily: TYPOGRAPHY.fonts.serifItalic, fontSize: TYPOGRAPHY.sizes.md, color: 'rgba(255,255,255,0.7)', marginTop: SPACING.md, textAlign: 'center' },
  scripture: { fontFamily: TYPOGRAPHY.fonts.serifItalic, fontSize: TYPOGRAPHY.sizes.sm, color: 'rgba(201,168,76,0.8)', marginTop: SPACING.xxl, textAlign: 'center', paddingHorizontal: SPACING.xxl },
  buttons: { paddingHorizontal: SPACING.xl, gap: SPACING.md },
  primaryButton: { height: 56, backgroundColor: '#C9A84C', borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { fontFamily: TYPOGRAPHY.fonts.serifSemiBold, fontSize: TYPOGRAPHY.sizes.base, color: '#2C1810' },
  ghostButton: { height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  ghostButtonText: { fontFamily: TYPOGRAPHY.fonts.serifSemiBold, fontSize: TYPOGRAPHY.sizes.base, color: '#FFFFFF' },
  guestLink: { fontFamily: TYPOGRAPHY.fonts.sansRegular, fontSize: TYPOGRAPHY.sizes.sm, color: 'rgba(255,255,255,0.5)', textAlign: 'center', paddingVertical: SPACING.md },
});
