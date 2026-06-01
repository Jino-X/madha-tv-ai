export default {
  name: 'Madha TV AI',
  slug: 'madha-tv-ai',
  version: '1.0.0',
  orientation: 'portrait' as const,
  icon: './assets/icon.png',
  scheme: 'madhatvai',
  userInterfaceStyle: 'automatic' as const,
  newArchEnabled: false,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.madhatv.ai',
    infoPlist: {
      NSMicrophoneUsageDescription: 'Madha TV AI needs microphone access for voice prayer.',
      NSCameraUsageDescription: 'Madha TV AI needs camera access for profile photo.',
      UIBackgroundModes: ['audio'],
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/android-icon-foreground.png',
      monochromeImage: './assets/android-icon-monochrome.png',
      backgroundImage: './assets/android-icon-background.png',
      backgroundColor: '#2C1810',
    },
    package: 'com.madhatv.ai',
    softwareKeyboardLayoutMode: 'resize',
    permissions: [
      'RECORD_AUDIO',
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'VIBRATE',
      'RECEIVE_BOOT_COMPLETED',
    ],
  },
  plugins: [
    'expo-font',
    'expo-secure-store',
    'expo-image-picker',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#2C1810',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/icon.png',
        color: '#8B1A1A',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '8d53f6c2-13e4-4922-9b0e-4fc7c192b93b',
    },
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    BIBLE_API_KEY: process.env.BIBLE_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};
