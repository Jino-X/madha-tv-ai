import React, { useRef, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, SPACING } from '../theme/tokens';
import { AppHeader } from '../components/common/AppHeader';
import { MessageBubble } from '../components/chat/MessageBubble';
import { DailyVerseCard } from '../components/chat/DailyVerseCard';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatInputBar } from '../components/chat/ChatInputBar';
import { SacredSourcesBar } from '../components/chat/SacredSourcesBar';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useOpenAIStream } from '../hooks/useOpenAIStream';
import { Message } from '../types';

export function ChatScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);

  const { messages, isStreaming, streamingText, addUserMessage } = useChatStore();
  const { profile } = useAuthStore();
  const { streamMessage } = useOpenAIStream();

  const handleSend = async (text: string) => {
    addUserMessage(text);
    await streamMessage(text);
  };

  const handleMicPress = () => {
    navigation.navigate('Voice');
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, streamingText]);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <DailyVerseCard onPress={() => navigation.navigate('DailyBread')} />
      {messages.length === 0 && (
        <View style={styles.greeting}>
          <Text style={[styles.greetingTitle, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifBold }]}>
            Grace and peace be with you.
          </Text>
          <Text style={[styles.greetingSubtitle, { color: colors.inkLight, fontFamily: TYPOGRAPHY.fonts.serifItalic }]}>
            How may I assist your spiritual journey today?
          </Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => {
    if (isStreaming && streamingText) {
      return (
        <View style={styles.streamingContainer}>
          <Text style={[styles.streamingText, { color: colors.ink, fontFamily: TYPOGRAPHY.fonts.serifRegular }]}>
            {streamingText}
            <Text style={{ color: colors.crimson }}>|</Text>
          </Text>
        </View>
      );
    }
    if (isStreaming) {
      return <TypingIndicator />;
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <AppHeader
        onAvatarPress={() => navigation.navigate('Settings')}
        avatarUrl={profile?.avatarUrl}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <SacredSourcesBar />
      <ChatInputBar
        onSend={handleSend}
        onMicPress={handleMicPress}
        disabled={isStreaming}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SPACING.base,
  },
  headerContent: {
    paddingTop: SPACING.sm,
  },
  greeting: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xxl,
  },
  greetingTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  greetingSubtitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    textAlign: 'center',
    maxWidth: '70%',
  },
  streamingContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  streamingText: {
    fontSize: TYPOGRAPHY.sizes.base,
    lineHeight: TYPOGRAPHY.sizes.base * TYPOGRAPHY.lineHeights.normal,
  },
});
