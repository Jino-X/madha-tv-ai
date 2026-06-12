import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../theme/ThemeContext';
import { TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../../theme/tokens';
import { AvatarCircle } from '../../components/common/AvatarCircle';
import { useAuthStore } from '../../store/useAuthStore';
import { uploadAvatar } from '../../api/supabase';

export function EditProfileScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { profile, updateProfile, user } = useAuthStore();

  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber || '');
  const [avatarUri, setAvatarUri] = useState(profile?.avatarUrl || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handlePickImage = async () => {
    try {
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraPermission.granted || !mediaPermission.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant camera and photo library permissions to change your profile picture.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Show options: Camera or Gallery
      Alert.alert(
        'Change Profile Picture',
        'Choose an option',
        [
          {
            text: 'Take Photo',
            onPress: () => handleCameraLaunch(),
          },
          {
            text: 'Choose from Gallery',
            onPress: () => handleGalleryLaunch(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to access camera or gallery');
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await handleImageUpload(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleGalleryLaunch = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await handleImageUpload(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleImageUpload = async (uri: string) => {
    if (!profile?.id) return;

    setIsUploadingImage(true);
    try {
      // Upload to Supabase Storage
      const avatarUrl = await uploadAvatar(profile.id, uri);
      
      // Update local state immediately for instant UI feedback
      setAvatarUri(avatarUrl);
      
      // Update profile in database
      await updateProfile({ avatarUrl });
      
      Alert.alert('Success', 'Profile picture updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload profile picture');
      console.error('Upload error:', error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name is required');
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile({
        displayName: displayName.trim(),
        bio: bio.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: colors.divider }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
          <Text
            style={[
              styles.saveButton,
              { color: isSaving ? colors.inkFaint : colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold },
            ]}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <AvatarCircle size={100} uri={avatarUri} borderColor={colors.crimson} borderWidth={3} />
            {isUploadingImage && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="large" color={colors.white} />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.changePhotoButton, { backgroundColor: colors.crimson }]}
            onPress={handlePickImage}
            disabled={isUploadingImage}
          >
            <Ionicons name="camera" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickImage} disabled={isUploadingImage}>
            <Text style={[styles.changePhotoText, { color: colors.crimson, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
              {isUploadingImage ? 'Uploading...' : 'Change Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Display Name *
          </Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your name"
            placeholderTextColor={colors.inkFaint}
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider },
            ]}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Email
          </Text>
          <TextInput
            value={email}
            editable={false}
            placeholder="your.email@example.com"
            placeholderTextColor={colors.inkFaint}
            style={[
              styles.input,
              { backgroundColor: colors.bgDeep, color: colors.inkFaint, borderColor: colors.divider },
            ]}
          />
          <Text style={[styles.helperText, { color: colors.inkFaint }]}>
            Email cannot be changed
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Phone Number
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+1 (555) 123-4567"
            placeholderTextColor={colors.inkFaint}
            keyboardType="phone-pad"
            style={[
              styles.input,
              { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider },
            ]}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.label, { color: colors.inkMedium, fontFamily: TYPOGRAPHY.fonts.sansSemiBold }]}>
            Bio
          </Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Share a little about your faith journey..."
            placeholderTextColor={colors.inkFaint}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={200}
            style={[
              styles.textArea,
              { backgroundColor: colors.surface, color: colors.ink, borderColor: colors.divider },
            ]}
          />
          <Text style={[styles.charCount, { color: colors.inkFaint }]}>
            {bio.length}/200
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.goldMuted }]}>
          <Ionicons name="information-circle" size={20} color={colors.gold} />
          <Text style={[styles.infoText, { color: colors.gold }]}>
            Your profile information is private and only visible to you unless you choose to share it.
          </Text>
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
  saveButton: { fontSize: TYPOGRAPHY.sizes.base },
  scrollContent: { padding: SPACING.base, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingVertical: SPACING.xl },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: SPACING.xxxl,
    right: '35%',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: { marginTop: SPACING.sm, fontSize: TYPOGRAPHY.sizes.sm },
  formSection: { marginBottom: SPACING.xl },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.base,
    fontFamily: TYPOGRAPHY.fonts.sansRegular,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    fontSize: TYPOGRAPHY.sizes.base,
    fontFamily: TYPOGRAPHY.fonts.sansRegular,
    minHeight: 100,
  },
  helperText: { fontSize: TYPOGRAPHY.sizes.xs, marginTop: SPACING.xs },
  charCount: { fontSize: TYPOGRAPHY.sizes.xs, textAlign: 'right', marginTop: SPACING.xs },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    marginTop: SPACING.base,
  },
  infoText: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, lineHeight: 20 },
});
