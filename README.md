# Ask Madha - Catholic Spiritual Companion

A deeply compassionate, theologically grounded Catholic spiritual guide mobile application built with React Native and Expo. Ask Madha serves as your personal spiritual director, offering guidance rooted in Catholic Catechism, Sacred Scripture, the writings of the Saints, and daily liturgy.

## 🙏 Features

### Core Functionality
- **AI-Powered Spiritual Guidance**: Chat with an AI companion trained in Catholic theology and spirituality
- **Daily Gospel Readings**: Access daily scripture readings with reflections and exegesis
- **Prayer Journey Tracking**: Monitor your spiritual growth with streak tracking and journaling
- **Community Prayer Requests**: Share and pray for community intentions
- **Voice Prayer** (Coming Soon): Voice-enabled prayer and meditation guidance
- **Multi-language Support**: English and Tamil (தமிழ்) with i18n integration

### Spiritual Resources
- Daily Gospel reflections with historical context
- Vatican News integration
- Bible Gateway access
- Sacred sources integration (Scripture, Catechism, Saints' writings)
- Personalized spiritual guidance based on Catholic tradition

## 🛠 Tech Stack

### Frontend
- **React Native** 0.85.3
- **Expo SDK** 56.0.0
- **TypeScript** 6.0.3 (Strict mode)
- **React Navigation** v6 (Bottom Tabs + Native Stack)

### State Management & Data
- **Zustand** - Lightweight state management with persistence
- **AsyncStorage** - Local data persistence
- **Expo Secure Store** - Secure credential storage

### Backend & APIs
- **Supabase** - Authentication, real-time database, and storage
- **Google Gemini 2.5 Flash** - AI-powered spiritual guidance with 1.5M token context
- **OpenAI Whisper** - Speech-to-text (planned)
- **ElevenLabs** - Text-to-speech (planned)
- **API.Bible** - Scripture data
- **Vatican News RSS** - Catholic news feed

### UI/UX
- **Expo Image** - Optimized image handling
- **Expo Linear Gradient** - Beautiful gradients
- **Expo Blur** - Glassmorphism effects
- **React Native Reanimated** - Smooth animations
- **React Native SVG** - Vector graphics
- **Expo Fonts** - Custom typography (EB Garamond, Crimson Pro)

### Additional Libraries
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **react-hook-form** - Form handling
- **zod** - Schema validation
- **i18next** - Internationalization

## 📱 Screens

1. **Chat Screen** - AI spiritual companion conversation
2. **Daily Bread** - Daily Gospel readings and reflections
3. **Voice Screen** - Voice prayer and meditation (coming soon)
4. **Journey Screen** - Spiritual growth tracking and journaling
5. **Community Screen** - Prayer requests and community support
6. **Profile Screen** - User settings and preferences
7. **Notifications Screen** - Prayer reminders and daily notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.4+ or v22.13.0+ or v24.3.0+ or v25.0.0+)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Jino-X/madha-tv-ai.git
cd madha-tv-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
BIBLE_API_KEY=your_bible_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Install iOS dependencies** (macOS only)
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Development Build (Recommended)

**iOS:**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

#### Expo Go (Limited functionality)
```bash
npx expo start
```

### Building for Production

#### Using EAS Build

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login to Expo**
```bash
eas login
```

3. **Build for iOS**
```bash
eas build --profile production --platform ios
```

4. **Build for Android**
```bash
eas build --profile production --platform android
```

## 📂 Project Structure

```
MadhaTVAI/
├── src/
│   ├── api/              # API clients (OpenAI, Bible, Vatican News)
│   ├── components/       # Reusable UI components
│   │   ├── chat/        # Chat-specific components
│   │   └── common/      # Common UI elements
│   ├── constants/       # App constants and spiritual prompts
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # App screens
│   ├── services/        # Business logic services
│   ├── store/           # Zustand state stores
│   ├── theme/           # Design tokens and themes
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── assets/              # Images, fonts, and static files
├── ios/                 # Native iOS code
├── android/             # Native Android code
├── app.config.ts        # Expo configuration
├── App.tsx              # App entry point
└── package.json         # Dependencies
```

## 🎨 Design System

### Themes
- **Sacred Light** - Warm, parchment-inspired light theme
- **Midnight Vigil** - Deep, contemplative dark theme

### Typography
- **Serif**: EB Garamond (Scripture and headings)
- **Sans-serif**: Crimson Pro (Body text and UI)

### Color Palette
- **Crimson**: `#8B1A1A` - Sacred red, primary accent
- **Gold**: `#C9A961` - Divine light, secondary accent
- **Parchment**: Warm neutrals for light theme
- **Deep Blues**: Contemplative tones for dark theme

## 🔐 Security

- API keys stored in `.env` (never committed to Git)
- Secure credential storage using Expo Secure Store
- Supabase Row Level Security (RLS) policies
- HTTPS-only API communication

## 🌍 Internationalization

Supported languages:
- English (en)
- Tamil (தமிழ்) (ta)

Add new languages in `src/i18n/`

## 📝 API Configuration

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up the following tables:
   - `profiles` - User profiles
   - `prayer_requests` - Community prayers
   - `journal_entries` - Spiritual journal
   - `prayer_history` - Prayer tracking

3. Enable Authentication providers (Email, Google, etc.)

### Google Gemini Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env` as `GEMINI_API_KEY`

### Bible API Setup

1. Register at [scripture.api.bible](https://scripture.api.bible)
2. Get API key and add to `.env`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Catholic Church teachings and traditions
- Vatican News for daily Catholic news
- API.Bible for Scripture access
- OpenAI for AI capabilities
- Expo team for the amazing framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ and 🙏 for the Catholic community**
