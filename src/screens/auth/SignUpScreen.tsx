import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS } from '../../theme/tokens';
import { useAuthStore } from '../../store/useAuthStore';

export function SignUpScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { signUp, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Please try again');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={colors.ink} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Begin Your Journey
        </Text>
        <Text style={[styles.subtitle, { color: colors.inkLight, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
          Create your spiritual companion account
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider }]}
          placeholder="Your Name"
          placeholderTextColor={colors.inkFaint}
          value={name}
          onChangeText={setName}
        />
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
          onPress={handleSignUp}
          disabled={isLoading}
          style={[styles.signUpButton, { backgroundColor: colors.crimson, opacity: isLoading ? 0.6 : 1 }]}
        >
          <Text style={[styles.signUpText, { color: colors.white, fontFamily: TYPOGRAPHY.fonts.serifSemiBold }]}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.linkText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansMedium }]}>
            Already have an account? Sign In
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
  signUpButton: { height: 52, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.md },
  signUpText: { fontSize: TYPOGRAPHY.sizes.base },
  linkText: { fontSize: TYPOGRAPHY.sizes.sm, textAlign: 'center', marginTop: SPACING.xl },
});
