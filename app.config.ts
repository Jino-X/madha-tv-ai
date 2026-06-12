export default {
  name: 'Ask Madha',
  slug: 'ask-madha',
  version: '1.0.0',
  orientation: 'portrait' as const,
  icon: './assets/icon.png',
  scheme: 'askmadha',
  userInterfaceStyle: 'automatic' as const,
  newArchEnabled: false,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.madhatv.ai',
    infoPlist: {
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
      'VIBRATE',
    ],
  },
  plugins: [
    'expo-font',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#2C1810',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '795acfa1-0746-4411-a367-f6964ea05a48',
    },
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};
