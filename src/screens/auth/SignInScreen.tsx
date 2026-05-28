import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';

export function SignInScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { signIn, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'Please try again');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={colors.ink} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: colors.inkLight, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
          Continue your spiritual journey
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider }]}
          placeholder="Email"
          placeholderTextColor={colors.inkFaint}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider }]}
          placeholder="Password"
          placeholderTextColor={colors.inkFaint}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={isLoading}
          style={[styles.signInButton, { backgroundColor: colors.crimson, opacity: isLoading ? 0.6 : 1 }]}
        >
          <Text style={[styles.signInText, { color: colors.white, fontFamily: TYPOGRAPHY.fonts.serifSemiBold }]}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.linkText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansMedium }]}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { padding: SPACING.base },
  content: { flex: 1, paddingHorizontal: SPACING.xl, paddingTop: SPACING.xxxl },
  title: { fontSize: TYPOGRAPHY.sizes.xxl, marginBottom: SPACING.sm },
  subtitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: SPACING.xxxl },
  input: { height: 52, borderRadius: RADIUS.md, paddingHorizontal: SPACING.base, marginBottom: SPACING.base, borderWidth: 1, fontSize: TYPOGRAPHY.sizes.base },
  signInButton: { height: 52, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.md },
  signInText: { fontSize: TYPOGRAPHY.sizes.base },
  linkText: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginTop: SPACING.xl },
});
