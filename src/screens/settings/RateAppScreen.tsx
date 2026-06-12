import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';

export function RateAppScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingPress = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (rating >= 4) {
        // High rating - redirect to App Store
        Alert.alert(
          'Thank You! 🙏',
          'Would you like to rate us on the App Store?',
          [
            { text: 'Not Now', style: 'cancel' },
            {
              text: 'Rate on App Store',
              onPress: () => {
                // The actual App Store link
                Linking.openURL('https://apps.apple.com/in/app/madha-tv/id879458299');
              },
            },
          ]
        );
      } else {
        // Lower rating - thank for feedback
        Alert.alert(
          'Thank You for Your Feedback',
          'We appreciate your honest feedback and will use it to improve the app.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Rate the App
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: colors.surface }, SHADOWS.md]}>
          <Text style={styles.heroEmoji}>🙏</Text>
          <Text style={[styles.heroTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Enjoying Ask Madha?
          </Text>
          <Text style={[styles.heroDesc, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            Your feedback helps us serve the Catholic community better
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          HOW WOULD YOU RATE YOUR EXPERIENCE?
        </Text>

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRatingPress(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={48}
                color={star <= rating ? colors.gold : colors.inkFaint}
              />
            </TouchableOpacity>
          ))}
        </View>

        {rating > 0 && (
          <Text style={[styles.ratingText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            {rating === 5 && '⭐ Excellent!'}
            {rating === 4 && '⭐ Great!'}
            {rating === 3 && '⭐ Good'}
            {rating === 2 && '⭐ Could be better'}
            {rating === 1 && '⭐ Needs improvement'}
          </Text>
        )}

        <Text style={[styles.sectionLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
          TELL US MORE (OPTIONAL)
        </Text>

        <TextInput
          value={feedback}
          onChangeText={setFeedback}
          placeholder="What do you love? What could we improve? Share your thoughts..."
          placeholderTextColor={colors.inkFaint}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          maxLength={500}
          style={[
            styles.feedbackInput,
            { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider },
          ]}
        />
        <Text style={[styles.charCount, { color: colors.inkFaint }]}>
          {feedback.length}/500
        </Text>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || rating === 0}
          style={[
            styles.submitButton,
            {
              backgroundColor: rating === 0 ? colors.divider : colors.crimson,
            },
            SHADOWS.md,
          ]}
        >
          <Text
            style={[
              styles.submitButtonText,
              { color: colors.white, fontFamily: TYPOGRAPHY.fonts.sansSemiBold },
            ]}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.benefitsCard, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="heart" size={24} color={colors.gold} />
          <View style={styles.benefitsContent}>
            <Text style={[styles.benefitsTitle, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              Your Voice Matters
            </Text>
            <Text style={[styles.benefitsDesc, { color: colors.gold, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Every review helps us improve and reach more people seeking spiritual guidance. Thank you for being part of our journey!
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
              4.8
            </Text>
            <Text style={[styles.statLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Average Rating
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
              12.5K
            </Text>
            <Text style={[styles.statLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Reviews
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
              95%
            </Text>
            <Text style={[styles.statLabel, { color: colors.inkFaint, fontFamily: TYPOGRAPHY.fonts.sansRegular }]}>
              Recommend
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.md },
  scrollContent: { padding: SPACING.base, paddingBottom: 40 },
  heroCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  heroEmoji: { fontSize: 64, marginBottom: SPACING.base },
  heroTitle: { fontSize: TYPOGRAPHY.sizes.lg, marginBottom: SPACING.xs },
  heroDesc: {
    fontSize: TYPOGRAPHY.sizes.sm,
    textAlign: 'center',
    paddingHorizontal: SPACING.base,
  },
  sectionLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
    marginBottom: SPACING.base,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.base,
  },
  starButton: {
    padding: SPACING.xs,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    textAlign: 'center',
    marginTop: SPACING.base,
  },
  feedbackInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.base,
    fontFamily: TYPOGRAPHY.fonts.sansRegular,
    minHeight: 120,
  },
  charCount: {
    fontSize: TYPOGRAPHY.sizes.xs,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  submitButton: {
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  submitButtonText: { fontSize: TYPOGRAPHY.sizes.base },
  benefitsCard: {
    flexDirection: 'row',
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.xl,
    gap: SPACING.base,
  },
  benefitsContent: { flex: 1 },
  benefitsTitle: { fontSize: TYPOGRAPHY.sizes.base, marginBottom: SPACING.xs },
  benefitsDesc: { fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: TYPOGRAPHY.sizes.xxl, marginBottom: SPACING.xs },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs },
  statDivider: { width: 1, height: '100%' },
});
