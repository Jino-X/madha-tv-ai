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
      projectId: '65e9c770-122a-4efd-8886-5942cd3f9af3',
    },
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};
